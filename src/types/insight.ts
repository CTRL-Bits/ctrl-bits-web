export interface Insight {
  id?: number | string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  featured_image?: string;
  category?:
    | string
    | {
        id?: number | string;
        name?: string;
        slug?: string;
        description?: string | null;
      };
  author?: {
    id?: number | string;
    username?: string;
    first_name?: string;
    last_name?: string;
    bio?: string;
    profile_picture?: string;
    website?: string;
  };
  tags?: {
    id?: number | string;
    name?: string;
    slug?: string;
  }[];
  views?: number;
  comments_count?: number;
  status?: string;
  slug?: string;
  link?: string;
  url?: string;
  created_at?: string;
  published_at?: string;
}
