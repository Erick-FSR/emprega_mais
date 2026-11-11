import React, { useState } from "react";
import { X, MapPin, User, DollarSign, Clock, Building, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export const JobDetailModal: React.FC = () => {
  const { selectedJob, setSelectedJob, user, applyToJob, appliedJobIds } = useApp();
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  if (!selectedJob) return null;

  const isApplied = appliedJobIds.includes(selectedJob.id) || appliedSuccess;

  const handleApply = () => {
    applyToJob(selectedJob.id);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#10630f] text-white p-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-green-200 font-semibold">
              Detalhes da Oportunidade
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">{selectedJob.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedJob(null)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-neutral-800">
          {/* Company & Core metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-1.5 font-medium text-neutral-900">
              <Building className="w-4 h-4 text-[#10630f]" />
              <span>{selectedJob.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#10630f]" />
              <span>
                {selectedJob.location} ({selectedJob.format})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#10630f]" />
              <span>{selectedJob.schedule}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-green-800">
              <DollarSign className="w-4 h-4 text-[#10630f]" />
              <span>{selectedJob.salary}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#10630f]" />
              <span>Nível {selectedJob.level}</span>
            </div>
          </div>

          {/* Stacks / Tecnologias */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              {selectedJob.requirementType} e Tecnologias
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedJob.stacks.map((stack) => (
                <span
                  key={stack}
                  className="bg-[#d9d9d9] text-neutral-800 font-semibold px-3 py-1 rounded-md text-xs sm:text-sm"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              Descrição da Vaga
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* User Profile Context */}
          <div className="bg-[#f0f7f0] border border-green-200 rounded-lg p-4 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-[#10630f]">
              Candidatura vinculada ao seu perfil:
            </span>
            <p className="text-sm text-neutral-700">
              <strong>{user.name}</strong> • {user.email}
            </p>
            <p className="text-xs text-neutral-500">
              Seus dados de escolaridade cadastrados na aba Perfil serão enviados diretamente ao
              recrutador.
            </p>
          </div>

          {/* Feedback banner */}
          {appliedSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded-lg flex items-center gap-2 text-sm font-medium animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span>Candidatura enviada com sucesso! A empresa entrará em contato por e-mail.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 p-4 px-6 border-t border-neutral-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setSelectedJob(null)}
            className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
          <button
            type="button"
            disabled={isApplied}
            onClick={handleApply}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all shadow-sm cursor-pointer ${
              isApplied
                ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                : "bg-[#10680f] hover:bg-[#0c510b] text-white active:scale-[0.98]"
            }`}
          >
            {isApplied ? "Candidatura Enviada ✓" : "Candidatar-se com meu Perfil"}
          </button>
        </div>
      </div>
    </div>
  );
};
