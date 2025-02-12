import { Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import routes from "tempo-routes";
import Home from "./components/home";
import Landing from "./components/landing";
import Main from "./components/main";
import Analysis from "./components/analysis";
import Learn from "./components/learn";
import Insights from "./components/insights";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Main />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/insights" element={<Insights />} />
        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
