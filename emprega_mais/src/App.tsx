import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Vagas } from "./pages/Vagas";
import { Perfil } from "./pages/Perfil";
import { JobDetailModal } from "./components/JobDetailModal";
import { SobreNosModal } from "./components/SobreNosModal";
import { SettingsModal } from "./components/SettingsModal";
import { LayoutGrid, LogIn, UserPlus, Briefcase, User } from "lucide-react";

const AppContent: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  return (
    <div className="relative min-h-screen bg-white">
      {/* Main Active Page */}
      {currentPage === "login" && <Login />}
      {currentPage === "cadastro" && <Cadastro />}
      {currentPage === "vagas" && <Vagas />}
      {currentPage === "perfil" && <Perfil />}

      {/* Modals */}
      <JobDetailModal />
      <SobreNosModal />
      <SettingsModal />

      {/* Quick Preview Navigation Toolbar */}
      <nav
        aria-label="Navegação rápida de páginas"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 text-xs font-medium border border-white/20 select-none"
      >
        <span className="text-neutral-400 text-[11px] px-1.5 hidden sm:inline flex items-center gap-1">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Páginas:</span>
        </span>
        <button
          type="button"
          onClick={() => navigateTo("vagas")}
          className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === "vagas"
              ? "bg-[#10680f] text-white font-bold shadow-xs"
              : "text-neutral-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Vagas</span>
        </button>
        <button
          type="button"
          onClick={() => navigateTo("perfil")}
          className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === "perfil"
              ? "bg-[#10680f] text-white font-bold shadow-xs"
              : "text-neutral-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Perfil</span>
        </button>
        <button
          type="button"
          onClick={() => navigateTo("login")}
          className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === "login"
              ? "bg-[#10680f] text-white font-bold shadow-xs"
              : "text-neutral-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Login</span>
        </button>
        <button
          type="button"
          onClick={() => navigateTo("cadastro")}
          className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            currentPage === "cadastro"
              ? "bg-[#10680f] text-white font-bold shadow-xs"
              : "text-neutral-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Cadastro</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
