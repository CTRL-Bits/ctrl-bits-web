export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  jobFunction: string;
  serviceInterest: string;
  message: string;
}

export interface PaginationLinks {
  next: string | null;
  previous: string | null;
}

interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  socials: Social[];
}

// Define interfaces for type safety
interface TechItem {
  name: string;
  icon: string;
}

export interface TechData {
  [category: string]: TechItem[];
}

interface Tag {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  slug?: string;
  description: string;
  full_description?: string;
  category: string;
  icon: string | null;
  link?: string;
  client: string;
  date?: string;
  tags: Tag[];
  featured: boolean;
  thumbnailClass?: string;
  thumbnail?: string;
}

export interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export interface TeamMemberResponse {
  links: PaginationLinks;
  count: number;
  total_pages: number;
  current_page: number;
  results: TeamMember[];
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  invert: boolean;
}

export interface CompanyResponse {
  links: PaginationLinks;
  count: number;
  total_pages: number;
  current_page: number;
  results: Company[];
}
