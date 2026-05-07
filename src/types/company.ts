export interface Company {
  id?: number | string;
  name?: string;
  tagline?: string;
  description?: string;
  about?: string;
  mission?: string;
  vision?: string;
  address?: string;
  location?: string;
  email?: string;
  phone?: string;
  website?: string;
  founded_year?: number | string;
  logo?: string;
  image?: string;
  invert?: boolean;
  is_international?: boolean;
  services?: string[] | string;
}

export interface CompanyResponse {
  links?: {
    next?: string | null;
    previous?: string | null;
  };
  count?: number;
  total_pages?: number;
  current_page?: number;
  results?: Company[];
}
