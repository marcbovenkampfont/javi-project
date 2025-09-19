// GoogleAuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { CLIENT_ID, SCOPES, SPREADSHEET_ID } from "../infoSheet";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface GoogleProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd?: string;
}

interface AuthContextProps {
  token: string | null;
  isSignedIn: boolean;
  login: () => Promise<string>;
  logout: () => Promise<void>;
  profile: GoogleProfile | null;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isSignedIn: false,
  login: () => Promise.reject("Not implemented"),
  logout: () => Promise.reject("Not implemented"),
  profile: null,
  refreshToken: () => Promise.reject("Not implemented"),
});

export const useGoogleAuth = () => useContext(AuthContext);

/* ----------------- HELPERS PARA CARGAR LOS SCRIPTS ----------------- */

let gsiLoaded: Promise<void> | null = null;
let gapiLoaded: Promise<void> | null = null;
let tokenClient: any = null;

function loadGsiClient() {
  if (!gsiLoaded) {
    gsiLoaded = new Promise<void>((resolve) => {
      if (window.google?.accounts) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  return gsiLoaded;
}

function loadGapiClient() {
  if (!gapiLoaded) {
    gapiLoaded = new Promise<void>((resolve) => {
      if (window.gapi?.client) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.onload = () => {
        window.gapi.load("client", async () => {
          await window.gapi.client.init({
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
          });
          resolve();
        });
      };
      document.body.appendChild(script);
    });
  }
  return gapiLoaded;
}

/* ----------------- PROVIDER ----------------- */

export const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("google_token"));
  const [isSignedIn, setIsSignedIn] = useState(!!token);
  const [profile, setProfile] = useState<GoogleProfile | null>(() => {
    const cached = localStorage.getItem("google_profile");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("google_token");
      const expiry = localStorage.getItem("google_token_expiry");

      const isValid = savedToken && expiry && Date.now() < parseInt(expiry);

      if (isValid) {
        setToken(savedToken);
        setIsSignedIn(true);
        await loadGapiClient();
        window.gapi?.client?.setToken({ access_token: savedToken });

        const cachedProfile = localStorage.getItem("google_profile");
        if (!cachedProfile) {
          await fetchUserProfile(savedToken);
        }
      } else {
        logout();
      }
    };

    checkAuth();
  }, []);

  const fetchUserProfile = async (token: string) => {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const profile = await response.json();
    setProfile(profile);
    localStorage.setItem("google_profile", JSON.stringify(profile));
  };

  const checkSheetAccess = async () => {
    try {
      const spreadsheetId = SPREADSHEET_ID; // tu Excel
      const response = await window.gapi.client.sheets.spreadsheets.get({
        spreadsheetId,
      });
      console.log("response", response)
      return true; // acceso concedido
    } catch (error: any) {
      if (error.status === 403 || error.status === 404) {
        throw new Error("No tienes permiso para acceder a esta hoja de cálculo");
      }
      throw error;
    }
  };

  const getTokenClient = () => {
    if (!tokenClient) {
      tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response: { access_token?: string }) => {
          if (response.access_token) {
            window.gapi.client.setToken({ access_token: response.access_token });
            setToken(response.access_token);
            setIsSignedIn(true);
            localStorage.setItem("google_token", response.access_token);
          }
        },
      });
    }
    return tokenClient;
  };

  const refreshToken = async (): Promise<void> => {
    await loadGsiClient();
    await loadGapiClient();
    const client = getTokenClient();
    client.requestAccessToken({ prompt: "" });
  };

  const login = async (): Promise<string> => {
    await loadGsiClient(); // 👈 asegura que exista window.google
    await loadGapiClient(); // 👈 asegura que exista window.gapi

    return new Promise((resolve, reject) => {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (response: { access_token?: string }) => {
          if (response.access_token) {
            try {

              window.gapi.client.setToken({ access_token: response.access_token });
              await fetchUserProfile(response.access_token);
              
              await checkSheetAccess()
              const expiryTime = Date.now() + 30 * 24 * 3600 * 1000;
              setToken(response.access_token);
              setIsSignedIn(true);
              localStorage.setItem("google_token", response.access_token);
              localStorage.setItem("google_token_expiry", expiryTime.toString());
  
              resolve(response.access_token);
            } catch (err) {
            // ❌ Si no tiene permiso -> desloguear y rechazar
              await logout();
              reject(err instanceof Error ? err.message : "Error de acceso a la hoja");
            }
          } else {
            await logout();
            reject("No se recibió access_token");
          }
        },
      });

      tokenClient.requestAccessToken();
    });
  };

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      setToken(null);
      setIsSignedIn(false);
      setProfile(null);
      localStorage.removeItem("google_token");
      localStorage.removeItem("google_token_expiry");
      localStorage.removeItem("google_profile");
      window.gapi?.client?.setToken(null);
      resolve();
    });
  };

  useEffect(() => {
    if (isSignedIn) {
      const interval = setInterval(() => {
        refreshToken();
      }, 55 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={{ token, isSignedIn, login, logout, profile, refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};
