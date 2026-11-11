import React, { useState } from "react";
import { X, LogOut, Shield, Bell, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, user, updateUser, navigateTo } = useApp();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifVagas, setNotifVagas] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsSettingsOpen(false);
    }, 1200);
  };

  const handleLogout = () => {
    setIsSettingsOpen(false);
    navigateTo("login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#10630f] text-white p-4 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-200" />
            <h2 className="text-lg font-bold">Configurações da Conta</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4 text-neutral-800 text-sm">
          <div className="flex flex-col gap-1 pb-3 border-b border-neutral-100">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              Perfil Ativo
            </span>
            <p className="font-bold text-neutral-900">{user.name}</p>
            <p className="text-neutral-500 text-xs">{user.email}</p>
          </div>

          {/* Notifications */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs uppercase tracking-wider">
              <Bell className="w-4 h-4 text-[#10630f]" />
              <span>Preferências de Notificação</span>
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Alertas de novas vagas no seu e-mail</span>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="w-4 h-4 accent-[#10630f] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span>Notificações de status de candidaturas</span>
              <input
                type="checkbox"
                checked={notifVagas}
                onChange={(e) => setNotifVagas(e.target.checked)}
                className="w-4 h-4 accent-[#10630f] cursor-pointer"
              />
            </label>
          </div>

          {/* Logout button */}
          <div className="pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da minha conta</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="bg-green-100 text-green-800 text-xs p-2 rounded flex items-center justify-center gap-1 font-medium">
              <Check className="w-4 h-4" />
              <span>Configurações salvas com sucesso!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 p-3 px-5 border-t border-neutral-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 rounded-md cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#10680f] hover:bg-[#0c510b] text-white px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors shadow-xs"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
