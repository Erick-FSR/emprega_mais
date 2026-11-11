export type Page = "login" | "cadastro" | "vagas" | "perfil";

export interface EducationItem {
  id: string;
  course: string;
  institution: string;
  completionYear: string;
}

export interface UserProfile {
  name: string;
  email: string;
  birthDate: string;
  bio: string;
  education: EducationItem[];
  photoUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  schedule: string; // e.g. "horario"
  level: string; // e.g. "Junior"
  format: string; // e.g. "Remoto"
  salary: string; // e.g. "R$ 5000 - 8000"
  requirementType: "Requisitos" | "Stacks";
  stacks: string[];
  career: string;
  location: string;
  description: string;
  companyLogo?: string;
}

export interface JobFilters {
  searchQuery: string;
  location: string;
  career: string;
  salaryRange: string;
  skill: string;
  format: string;
}
