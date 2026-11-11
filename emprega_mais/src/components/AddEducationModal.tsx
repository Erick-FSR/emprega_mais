import React, { useState } from "react";
import { X, GraduationCap } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AddEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEducationModal: React.FC<AddEducationModalProps> = ({ isOpen, onClose }) => {
  const { addEducation } = useApp();
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [completionYear, setCompletionYear] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (course.trim() && institution.trim()) {
      addEducation({
        course: course.trim(),
        institution: institution.trim(),
        completionYear: completionYear.trim() || new Date().getFullYear().toString(),
      });
      setCourse("");
      setInstitution("");
      setCompletionYear("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#10630f] text-white p-4 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-200" />
            <h2 className="text-lg font-bold">Adicionar Escolaridade</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-neutral-800 text-sm">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-xs uppercase tracking-wider text-neutral-600">
              Curso / Formação
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="ex: Ciência da Computação"
              className="w-full bg-[#f1f1f1] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#10630f]/30 border border-neutral-200"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-xs uppercase tracking-wider text-neutral-600">
              Instituição de Ensino
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="ex: USP, FIAP, Alura, Coursera"
              className="w-full bg-[#f1f1f1] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#10630f]/30 border border-neutral-200"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-xs uppercase tracking-wider text-neutral-600">
              Ano de Conclusão
            </label>
            <input
              type="text"
              value={completionYear}
              onChange={(e) => setCompletionYear(e.target.value)}
              placeholder="ex: 2024"
              maxLength={4}
              className="w-full bg-[#f1f1f1] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#10630f]/30 border border-neutral-200"
              required
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end gap-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-md cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#10680f] hover:bg-[#0c510b] text-white px-5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors shadow-xs"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
