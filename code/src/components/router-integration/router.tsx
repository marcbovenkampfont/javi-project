import { RouterProvider } from "react-router/dom";
import { createBrowserRouter, type RouteObject } from "react-router";

const NORMALIZE_BASENAME_REGEX = /\/$/;

// contextPath.ts
export function contextPath() {
  return import.meta.env.BASE_URL || "/";
}


const Router = ({ routes }: Readonly<{ routes: RouteObject[] }>) => {
  const router = createBrowserRouter(routes, { basename: contextPath().replace(NORMALIZE_BASENAME_REGEX, "") });

  return <RouterProvider router={router} />;
};

export default Router;
