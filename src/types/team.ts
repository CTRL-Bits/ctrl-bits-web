export interface SocialLink {
  platform?: string;
  icon?: string;
  url?: string;
}

export interface TeamMember {
  id?: number | string;
  name?: string;
  role?: string;
  designation?: string;
  bio?: string;
  image?: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  socials?: SocialLink[];
  display_order?: number;
  ordering?: number;
  order?: number;
  is_active?: boolean;
}

export interface TeamMemberResponse {
  links?: {
    next?: string | null;
    previous?: string | null;
  };
  count?: number;
  total_pages?: number;
  current_page?: number;
  results?: TeamMember[];
}
