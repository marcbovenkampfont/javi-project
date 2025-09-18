import { createRoutesFromElements, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home.tsx";
import { APP_ROUTES } from "../shared/constants/appRoutes";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute.tsx";
import Layout from "../layout/layout.tsx";
import { Trainings } from "../pages/trainings/trainings.tsx";
import { Perfil } from "../pages/perfil/perfil.tsx";
// import Resume from "../pages/resume/resume";
// import AddFine from "../pages/add-fine/add-fine";
// import UpdateFine from "../pages/update-fine/update-fine";


export const AppRoutes = () => {

    console.log("App Routes")
    return createRoutesFromElements(
        <Route
            element={<Layout />}
            errorElement={
                <button style={{width: "200px", height: '40px', color: 'black', backgroundColor: 'grey', margin: 'auto'}} title="REFRESH" children={"REFREsh"} onClick={() => window.location.reload()} />
            }
        >
            <Route key="default" path="/" element={<Navigate to={APP_ROUTES.home} replace />} />
            <Route element={<ProtectedRoute />}>
                <Route key="home" path={APP_ROUTES.home} element={<Home />} />
                <Route key="entrenamientos" path={APP_ROUTES.entrenamientos} element={<Trainings />} />
                <Route key="perfil" path={APP_ROUTES.perfil} element={<Perfil />} />
                {/* <Route key="alumnos" path={APP_ROUTES.resume} element={<Resume />} />
                <Route key="add-multa" path={APP_ROUTES.addMulta} element={<AddFine />} />
                <Route key="update-multa" path={APP_ROUTES.updateMulta} element={<UpdateFine />} /> */}
            </Route>
        </Route>
    )
    // return (
    //     <Routes>
    //         <Route key="default" path="/" element={<Navigate to={APP_ROUTES.home} replace />} />
    //         <Route element={<ProtectedRoute />}>
    //             <Route key="home" path={APP_ROUTES.home} element={<Home />} />
    //             {/* <Route key="alumnos" path={APP_ROUTES.resume} element={<Resume />} />
    //             <Route key="add-multa" path={APP_ROUTES.addMulta} element={<AddFine />} />
    //             <Route key="update-multa" path={APP_ROUTES.updateMulta} element={<UpdateFine />} /> */}
    //         </Route>
    //     </Routes>
    // )
}