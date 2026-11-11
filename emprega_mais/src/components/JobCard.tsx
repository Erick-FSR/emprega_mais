import React from "react";
import { User, MapPin, DollarSign, Check } from "lucide-react";
import { Job } from "../types";
import { useApp } from "../context/AppContext";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { setSelectedJob, appliedJobIds } = useApp();
  const isApplied = appliedJobIds.includes(job.id);

  return (
    <div className="bg-white rounded-lg p-3.5 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-100 hover:shadow-md transition-shadow">
      {/* Left side: Company Monogram & Info */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 w-full md:w-auto">
        {/* Foto / Monograma da empresa box */}
        <div className="w-28 sm:w-32 h-20 sm:h-22 bg-[#d9d9d9] rounded flex flex-col items-center justify-center p-2 text-center text-xs font-medium text-neutral-800 leading-tight shrink-0 select-none">
          <span>Foto/</span>
          <span>Monograma</span>
          <span>da empresa</span>
        </div>

        {/* Job info */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-normal">{job.schedule}</p>

          {/* Tags row with dark green icons */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs sm:text-sm font-medium text-neutral-800">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#10680f] fill-[#10680f]" />
              <span>{job.level}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#10680f] fill-[#10680f]" />
              <span>{job.format}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#10680f] stroke-[2.5]" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle/Right: Stacks & Action Button */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
        {/* Stacks / Requisitos */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] sm:text-xs text-neutral-600 font-medium">
            {job.requirementType}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {job.stacks.map((stack) => (
              <span
                key={stack}
                className="bg-[#d9d9d9] text-neutral-800 rounded px-2.5 py-0.5 sm:py-1 text-xs font-semibold whitespace-nowrap"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {/* Ver vaga button */}
        <div className="shrink-0 pl-2">
          <button
            type="button"
            onClick={() => setSelectedJob(job)}
            className={`px-4 sm:px-5 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
              isApplied
                ? "bg-[#10680f]/15 text-[#10680f] border border-[#10680f]"
                : "bg-[#10680f] hover:bg-[#0c510b] active:scale-[0.98] text-white"
            }`}
          >
            {isApplied && <Check className="w-4 h-4" />}
            <span>{isApplied ? "Candidatado" : "Ver vaga"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
