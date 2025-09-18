import { useState, useEffect } from "react";
import { SPREADSHEET_ID } from "../../infoSheet";
import type { Alumno } from "../types/alumno.types";

export const useInfoAlumno = (mailFilter?: string) => {
  const [info, setInfo] = useState<Alumno[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfo = async () => {
      if (!window.gapi?.client) {
        setError("GAPI no está cargado");
        setLoading(false);
        return;
      }

      try {
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
  }, []);

  return { info, error, loading };
};
