import { useState, useEffect } from "react";
import { SPREADSHEET_ID } from "../../infoSheet";
import type { Alumno } from "../types/alumno.types";
import { useGoogleAuth } from "../../auth/GoogleAuthProvider";

const CACHE_KEY = "alumnos_login";
const CACHE_TTL = 2 * 60 * 60 * 1000;

export const useInfoAlumno = (mailFilter?: string) => {
  const [info, setInfo] = useState<Alumno[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { refreshToken, logout } = useGoogleAuth()

  useEffect(() => {
    const fetchInfo = async () => {

      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            console.log("usando caché de alumno")
            if (mailFilter) {
              const alumno = data.find((a: Alumno) => a.mail === mailFilter);
              setInfo(alumno ? [alumno]: []);
            } else {
              setInfo(data);
            }
            setLoading(false)
            return;
          }
        }

        await refreshToken();

        const spreadsheet = await window.gapi.client.sheets.spreadsheets.get({
          spreadsheetId: SPREADSHEET_ID,
        });

        const sheets = spreadsheet.result.sheets;
        const hojaSheet = sheets.find(
            (s: any) => s.properties.title === "Alumnos"
        );

        if (!hojaSheet) {
          alert('❌ La hoja "Alumnos" no existe');
          return;
        }

        const response = await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: SPREADSHEET_ID,
          range: "Alumnos!A:E", // primera fila
        }).then((response: any) => {
            const lines = response.result.values;
            const dataRows = lines.slice(1)
            const alumnos: Alumno[] = dataRows.map((line: any) => {
                const id = line[0]
                const name = line[1]
                const mail = line[2]
                const sex = line[3]
                const team = line[4]
                return {
                    id: id,
                    name: name,
                    mail: mail,
                    sex: sex,
                    team: team,
                };
            })

            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ data: alumnos, timestamp: Date.now() })
            )

            if (mailFilter) {
                const alumno = alumnos.find((a) => a.mail === mailFilter);
                
                setInfo(alumno ? [alumno] : [])
                return alumno
            }
            setInfo(alumnos)
            return alumnos
        })
        return response
      } catch (err: any) {
        console.error("Error al leer la hoja 'Alumnos':", err);
        setError(err.result?.error?.message || "Error desconocido al leer la hoja");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [mailFilter, refreshToken]);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem(CACHE_KEY);
      setInfo([]);
    };

    // asumimos que logout es una función que se llama desde el provider
    // si quieres, puedes emitir un evento o usar un estado global para detectar logout
    // aquí simplemente borramos cada vez que info se monta con logout disponible
    return () => handleLogout();
  }, [logout]);

  return { info, error, loading };
};
