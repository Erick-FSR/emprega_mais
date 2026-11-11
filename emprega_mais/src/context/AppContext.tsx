import React, { createContext, useContext, useState, useEffect } from "react";
import { Page, UserProfile, Job, JobFilters, EducationItem } from "../types";
import { initialJobs } from "../data/mockJobs";

interface AppContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  addEducation: (item: Omit<EducationItem, "id">) => void;
  removeEducation: (id: string) => void;
  jobs: Job[];
  filters: JobFilters;
  setFilter: (key: keyof JobFilters, value: string) => void;
  resetFilters: () => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  isSobreNosOpen: boolean;
  setIsSobreNosOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  appliedJobIds: string[];
  applyToJob: (jobId: string) => void;
}

const defaultUser: UserProfile = {
  name: "Lucas Oliveira da Silva",
  email: "lucas.silva@email.com.br",
  birthDate: "15/08/1998",
  bio: "Desenvolvedor Front-end com experiência em React, TypeScript e interfaces acessíveis. Apaixonado por criar produtos que conectam pessoas.",
  education: [
    {
      id: "1",
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "FIAP",
      completionYear: "2023",
    },
    {
      id: "2",
      course: "Técnico em Informática",
      institution: "ETEC São Paulo",
      completionYear: "2019",
    },
    {
      id: "3",
      course: "Especialização Frontend com React & TypeScript",
      institution: "Rocketseat",
      completionYear: "2022",
    },
  ],
};

const defaultFilters: JobFilters = {
  searchQuery: "",
  location: "",
  career: "",
  salaryRange: "",
  skill: "",
  format: "",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>("vagas");
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [jobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSobreNosOpen, setIsSobreNosOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const addEducation = (item: Omit<EducationItem, "id">) => {
    const newItem: EducationItem = {
      ...item,
      id: Date.now().toString(),
    };
    setUser((prev) => ({
      ...prev,
      education: [...prev.education, newItem],
    }));
  };

  const removeEducation = (id: string) => {
    setUser((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const setFilter = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const applyToJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        user,
        updateUser,
        addEducation,
        removeEducation,
        jobs,
        filters,
        setFilter,
        resetFilters,
        selectedJob,
        setSelectedJob,
        isSobreNosOpen,
        setIsSobreNosOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        appliedJobIds,
        applyToJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
