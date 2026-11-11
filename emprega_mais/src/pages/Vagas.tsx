import React, { useState } from "react";
import { Search, MapPin, ChevronDown, XCircle, User as UserIcon } from "lucide-react";
import { Logo } from "../components/Logo";
import { JobCard } from "../components/JobCard";
import { useApp } from "../context/AppContext";

export const Vagas: React.FC = () => {
  const { jobs, filters, setFilter, resetFilters, navigateTo } = useApp();
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const [localLocation, setLocalLocation] = useState(filters.location);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter("searchQuery", localSearch);
    setFilter("location", localLocation);
  };

  const handleClear = () => {
    setLocalSearch("");
    setLocalLocation("");
    resetFilters();
  };

  // Filter jobs logic
  const filteredJobs = jobs.filter((job) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchStack = job.stacks.some((s) => s.toLowerCase().includes(q));
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchCareer = job.career.toLowerCase().includes(q);
      if (!matchTitle && !matchStack && !matchDesc && !matchCareer) return false;
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(loc) && !job.format.toLowerCase().includes(loc)) {
        return false;
      }
    }

    if (filters.career && !job.career.toLowerCase().includes(filters.career.toLowerCase())) {
      return false;
    }

    if (filters.salaryRange && !job.salary.includes(filters.salaryRange)) {
      return false;
    }

    if (filters.skill) {
      const hasSkill = job.stacks.some((s) =>
        s.toLowerCase().includes(filters.skill.toLowerCase()),
      );
      if (!hasSkill) return false;
    }

    if (filters.format && !job.format.toLowerCase().includes(filters.format.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Dark Green Header & Filter Section */}
      <header className="bg-[#10630f] text-white">
        {/* Top Navbar Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="white" size="md" onClick={() => navigateTo("vagas")} />

          {/* Ver perfil button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigateTo("perfil")}
              className="bg-white hover:bg-neutral-100 active:scale-[0.98] text-[#10630f] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <UserIcon className="w-4 h-4 fill-[#10630f]" />
              <span>Ver perfil</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3.5 sm:pb-4 flex flex-col gap-2.5">
          {/* Row 1: Search input + Location input + Buscar button */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
          >
            {/* Search input */}
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-neutral-600 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Buscar vagas: React.js, Node.js"
                className="w-full bg-[#d9d9d9] text-neutral-900 placeholder:text-neutral-600 rounded-md pl-9 pr-3 py-1.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-white/40 transition-all font-normal"
              />
            </div>

            {/* Location input / dropdown */}
            <div className="sm:w-64 relative flex items-center">
              <MapPin className="w-4 h-4 text-neutral-600 absolute left-3 pointer-events-none" />
              <select
                value={localLocation}
                onChange={(e) => {
                  setLocalLocation(e.target.value);
                  setFilter("location", e.target.value);
                }}
                className="w-full bg-[#d9d9d9] text-neutral-900 rounded-md pl-9 pr-8 py-1.5 text-xs sm:text-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-white/40 font-normal"
              >
                <option value="">Localização</option>
                <option value="Remoto">Remoto</option>
                <option value="São Paulo">São Paulo, SP</option>
                <option value="Rio de Janeiro">Rio de Janeiro, RJ</option>
                <option value="Belo Horizonte">Belo Horizonte, MG</option>
                <option value="Curitiba">Curitiba, PR</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-600 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Buscar button */}
            <button
              type="submit"
              className="bg-[#d9d9d9] hover:bg-white text-neutral-900 font-medium text-xs sm:text-sm px-5 py-1.5 rounded-md transition-colors cursor-pointer shadow-2xs whitespace-nowrap active:scale-[0.98]"
            >
              Buscar
            </button>
          </form>

          {/* Row 2: Secondary Dropdown Filters + Limpar */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {/* Carreira filter */}
            <div className="relative">
              <select
                value={filters.career}
                onChange={(e) => setFilter("career", e.target.value)}
                className="bg-[#d9d9d9] text-neutral-900 rounded-md px-3 pr-7 py-1 text-xs outline-none appearance-none cursor-pointer font-normal hover:bg-neutral-200 transition-colors"
              >
                <option value="">Carreira</option>
                <option value="Desenvolvimento Front-end">Front-end</option>
                <option value="Desenvolvimento Full Stack">Full Stack</option>
                <option value="Desenvolvimento Mobile">Mobile</option>
                <option value="Desenvolvimento Web">Web</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Faixa salarial filter */}
            <div className="relative">
              <select
                value={filters.salaryRange}
                onChange={(e) => setFilter("salaryRange", e.target.value)}
                className="bg-[#d9d9d9] text-neutral-900 rounded-md px-3 pr-7 py-1 text-xs outline-none appearance-none cursor-pointer font-normal hover:bg-neutral-200 transition-colors"
              >
                <option value="">Faixa salarial</option>
                <option value="5000">R$ 5.000 - 8.000</option>
                <option value="8000">R$ 8.000 - 12.000</option>
                <option value="12000">R$ 12.000+</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Habilidades filter */}
            <div className="relative">
              <select
                value={filters.skill}
                onChange={(e) => setFilter("skill", e.target.value)}
                className="bg-[#d9d9d9] text-neutral-900 rounded-md px-3 pr-7 py-1 text-xs outline-none appearance-none cursor-pointer font-normal hover:bg-neutral-200 transition-colors"
              >
                <option value="">Habilidades</option>
                <option value="React">React Js</option>
                <option value="JavaScript">JavaScript</option>
                <option value="GIT">GIT</option>
                <option value="Node">Node.js</option>
                <option value="TypeScript">TypeScript</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Formato filter */}
            <div className="relative">
              <select
                value={filters.format}
                onChange={(e) => setFilter("format", e.target.value)}
                className="bg-[#d9d9d9] text-neutral-900 rounded-md px-3 pr-7 py-1 text-xs outline-none appearance-none cursor-pointer font-normal hover:bg-neutral-200 transition-colors"
              >
                <option value="">Formato</option>
                <option value="Remoto">Remoto</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Presencial">Presencial</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-600 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Limpar filter button */}
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-white hover:text-green-200 text-xs font-medium ml-auto cursor-pointer transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {/* Thin Cyan Stripe */}
        <div className="h-[3px] w-full bg-[#0c86c8]" />
      </header>

      {/* Main Content: Job Listings */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 p-8">
            <p className="text-neutral-700 font-semibold text-base">
              Nenhuma vaga encontrada com os filtros selecionados.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-3 text-[#10630f] hover:underline text-sm font-bold cursor-pointer"
            >
              Limpar filtros e ver todas as vagas
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
