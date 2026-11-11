import React, { useState } from "react";
import { Cake, User as UserIcon, Settings, Plus, Trash2, Edit2, Check } from "lucide-react";
import { Logo } from "../components/Logo";
import { AddEducationModal } from "../components/AddEducationModal";
import { useApp } from "../context/AppContext";

export const Perfil: React.FC = () => {
  const { user, updateUser, removeEducation, navigateTo, setIsSobreNosOpen, setIsSettingsOpen } =
    useApp();

  const [isAddEduOpen, setIsAddEduOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempBirth, setTempBirth] = useState(user.birthDate);
  const [tempBio, setTempBio] = useState(user.bio);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateUser({ name: tempName.trim() });
    }
    setIsEditingName(false);
  };

  const handleSaveBirth = (val: string) => {
    setTempBirth(val);
    updateUser({ birthDate: val });
  };

  const handleSaveBio = () => {
    updateUser({ bio: tempBio.trim() });
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header: Dark Green (Harmonized with Vagas page) */}
      <header className="bg-[#10630f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="white" size="md" onClick={() => navigateTo("vagas")} />

          {/* Right Links: VER VAGAS & SOBRE NÓS */}
          <nav className="flex items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => navigateTo("vagas")}
              className="text-white hover:text-green-200 font-extrabold text-sm sm:text-base tracking-wider uppercase transition-colors cursor-pointer"
            >
              VER VAGAS
            </button>
            <button
              type="button"
              onClick={() => setIsSobreNosOpen(true)}
              className="text-white hover:text-green-200 font-extrabold text-sm sm:text-base tracking-wider uppercase transition-colors cursor-pointer"
            >
              SOBRE NÓS
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar: Harmonized dark green with white circular icons */}
        <aside className="w-full md:w-18 bg-[#10630f] md:min-h-[calc(100vh-65px)] flex md:flex-col items-center justify-between p-3.5 md:py-6 shrink-0 shadow-inner">
          {/* Top user avatar circle */}
          <div
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#10630f] shadow-md border-2 border-neutral-300"
            title="Perfil do Usuário"
          >
            <UserIcon className="w-6 h-6 fill-current" />
          </div>

          {/* Bottom gear settings button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="w-11 h-11 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-800 hover:text-black transition-all shadow-md border-2 border-neutral-300 cursor-pointer"
            title="Configurações"
            aria-label="Configurações da conta"
          >
            <Settings className="w-6 h-6 stroke-[2.2]" />
          </button>
        </aside>

        {/* Main Profile Body */}
        <main className="flex-1 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Left/Center Column: Name card + Escolaridade card */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Card 1: Nome (Harmonized brand green card with high contrast) */}
            <div className="bg-[#37bf36] rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-center min-h-[140px] sm:min-h-[160px] relative transition-all">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-800">
                Nome completo
              </span>

              {isEditingName ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="flex-1 bg-white text-neutral-900 text-2xl sm:text-3xl font-extrabold px-3 py-1.5 rounded-lg outline-none border border-neutral-300"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="bg-black hover:bg-neutral-900 text-white p-2.5 rounded-lg cursor-pointer transition-colors"
                    title="Salvar"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                    {user.name}
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(user.name);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 text-neutral-800 hover:text-black hover:bg-white/30 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Editar nome"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Card 2: Escolaridade (Harmonized brand green card) */}
            <div className="bg-[#37bf36] rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[280px]">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  escolaridade
                </h2>

                {/* Education bullet items */}
                <div className="flex flex-col gap-2.5 pl-1">
                  {user.education.length === 0 ? (
                    <p className="text-neutral-800 text-sm italic">
                      Nenhuma formação acadêmica adicionada ainda.
                    </p>
                  ) : (
                    user.education.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-start justify-between gap-2 text-sm sm:text-base font-medium text-neutral-900"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-xl leading-none select-none">•</span>
                          <span className="leading-snug">
                            {item.course}, {item.institution}, {item.completionYear}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(item.id)}
                          className="opacity-0 group-hover:opacity-100 hover:text-red-700 text-neutral-700 p-1 rounded transition-all cursor-pointer shrink-0"
                          title="Remover formação"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom: + adicionar mais button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setIsAddEduOpen(true)}
                  className="w-full bg-[#d9d9d9] hover:bg-[#cfcfcf] active:scale-[0.99] text-neutral-900 rounded-lg py-3 px-4 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs font-medium"
                >
                  <Plus className="w-5 h-5 text-neutral-800 stroke-[2.5]" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">
                    adicionar mais
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo + Birthday + Bio box */}
          <div className="w-full lg:w-80 flex flex-col gap-4 sm:gap-5 shrink-0">
            {/* Photo frame: Gray square matching prototype */}
            <div className="w-full aspect-square max-w-[280px] mx-auto lg:max-w-none bg-[#d9d9d9] rounded-lg border-2 border-neutral-400 flex flex-col items-center justify-center p-4 text-center select-none shadow-xs relative overflow-hidden group">
              <UserIcon className="w-24 h-24 text-neutral-500 mb-2" />
              <span className="text-xs font-semibold text-neutral-600">Foto de Perfil</span>
              <span className="text-[11px] text-neutral-500 mt-1">Formato quadrado</span>
            </div>

            {/* Birthday input box with cake icon */}
            <div className="bg-[#d9d9d9] rounded-lg px-4 py-2.5 flex items-center gap-3 shadow-2xs border border-neutral-300">
              <Cake className="w-5 h-5 text-neutral-800 shrink-0" />
              <input
                type="text"
                value={tempBirth}
                onChange={(e) => handleSaveBirth(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="bg-transparent text-sm sm:text-base font-medium text-neutral-900 outline-none w-full placeholder:text-neutral-500"
              />
            </div>

            {/* Additional Info / Bio box */}
            <div className="bg-[#d9d9d9] rounded-lg p-4 shadow-2xs border border-neutral-300 flex flex-col gap-2 min-h-[120px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Sobre mim / Resumo
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingBio(!isEditingBio)}
                  className="text-neutral-700 hover:text-black cursor-pointer p-0.5"
                >
                  {isEditingBio ? (
                    <Check className="w-4 h-4 text-green-800" onClick={handleSaveBio} />
                  ) : (
                    <Edit2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {isEditingBio ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    rows={4}
                    className="w-full bg-white text-xs sm:text-sm text-neutral-800 p-2 rounded outline-none border border-neutral-300 resize-none"
                    placeholder="Conte sobre sua trajetória profissional..."
                  />
                  <button
                    type="button"
                    onClick={handleSaveBio}
                    className="bg-black text-white text-xs font-semibold py-1 px-3 rounded self-end cursor-pointer"
                  >
                    Salvar resumo
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  {user.bio || "Adicione uma breve apresentação sobre sua carreira."}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Education Modal */}
      <AddEducationModal isOpen={isAddEduOpen} onClose={() => setIsAddEduOpen(false)} />
    </div>
  );
};
