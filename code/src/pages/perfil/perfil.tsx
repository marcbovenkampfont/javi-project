import { useGoogleAuth } from "../../auth/GoogleAuthProvider"
import { useInfoAlumno } from "../../shared/hooks/use-get-info-alumno";

export const Perfil = () => {

    const { logout, profile } = useGoogleAuth();
    const { info, loading } = useInfoAlumno(profile?.email)

    console.log("info", info)

    return (
        <>
            <div>Perfil</div>
            {loading && <div>Cargando información del alumno...</div>}
            {!loading && info.map((a) => {
                return <div key={a.id} style={{ margin: 'auto', padding: '20px', border: '1px solid', display: 'flex', flexDirection: 'column'}}>
                    <span>{a.name}</span>
                    <span>{a.mail}</span>
                    <span>Sexo: {a.sex === "M" ? "Hombre" : "Mujer"}</span>
                    <span>Equipo: {a.team}</span>
                </div>
            })}
            <button onClick={logout}>Logout</button>
        </>
    )
}
