import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";

export function TempoRoutes() {
  if (!import.meta.env.VITE_TEMPO) return null;
  return useRoutes(routes);
}
