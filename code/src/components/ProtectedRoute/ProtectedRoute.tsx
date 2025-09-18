import { useEffect, useState } from "react";
import { useGoogleAuth } from "../../auth/GoogleAuthProvider";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isSignedIn, login } = useGoogleAuth();
  const [loading, setLoading] = useState(true);
  console.log("loading", loading);
  console.log("isSignedIn", isSignedIn)

  // useEffect(() => {
  //   const ensureLogin = async () => {
  //     if (!isSignedIn) {
  //       try {
  //         await login(); // forzar login si no está logueado
  //       } catch (err) {
  //         console.error("Error al loguear", err);
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   ensureLogin();
  // }, [isSignedIn, login]);

  if (!isSignedIn) {
    return <div>
        No estás logeado
        <button onClick={login}>Login</button>
    </div>
  }

  return <Outlet />;
};
