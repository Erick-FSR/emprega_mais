import React from "react";
import { X, Award, Users, Target, HeartHandshake } from "lucide-react";
import { Logo } from "./Logo";
import { useApp } from "../context/AppContext";

export const SobreNosModal: React.FC = () => {
  const { isSobreNosOpen, setIsSobreNosOpen } = useApp();

  if (!isSobreNosOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#10630f] text-white p-5 flex items-center justify-between">
          <Logo variant="white" size="sm" />
          <button
            type="button"
            onClick={() => setIsSobreNosOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-neutral-800">
          <div>
            <h2 className="text-2xl font-extrabold text-[#10630f]">Sobre o EMPREGA+</h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
              O <strong>EMPREGA+</strong> é uma plataforma moderna e acessível, desenvolvida para
              conectar talentos de tecnologia a empresas inovadoras em todo o Brasil. Nosso
              propósito é democratizar o acesso a vagas justas, transparentes e alinhadas ao
              desenvolvimento profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-[#f2f8f2] p-3.5 rounded-lg border border-green-100 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#10630f] font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>Nossa Missão</span>
              </div>
              <p className="text-xs text-neutral-600 leading-normal">
                Aproximar pessoas candidatas e recrutadores com processos transparentes e foco em
                competências reais.
              </p>
            </div>

            <div className="bg-[#f2f8f2] p-3.5 rounded-lg border border-green-100 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#10630f] font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>Inclusão & Diversidade</span>
              </div>
              <p className="text-xs text-neutral-600 leading-normal">
                Incentivo ativo a oportunidades afirmativas e equidade de gênero e raça no
                ecossistema tecnológico.
              </p>
            </div>

            <div className="bg-[#f2f8f2] p-3.5 rounded-lg border border-green-100 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#10630f] font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>Transparência Salarial</span>
              </div>
              <p className="text-xs text-neutral-600 leading-normal">
                Faixas salariais claras e requisitos diretos para garantir decisões conscientes de
                carreira.
              </p>
            </div>

            <div className="bg-[#f2f8f2] p-3.5 rounded-lg border border-green-100 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#10630f] font-bold text-sm">
                <HeartHandshake className="w-4 h-4" />
                <span>Comunidade</span>
              </div>
              <p className="text-xs text-neutral-600 leading-normal">
                Suporte integral a desenvolvedores juniores, plenos e seniores em suas jornadas
                profissionais.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 p-4 px-6 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={() => setIsSobreNosOpen(false)}
            className="bg-[#10680f] hover:bg-[#0c510b] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
