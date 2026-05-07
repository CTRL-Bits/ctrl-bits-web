import axios from "axios";
import type { AxiosResponse } from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.ctrlbits.com/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type PaginatedResponse<T> = {
  links?: {
    next?: string | null;
    previous?: string | null;
  };
  count?: number;
  total_pages?: number;
  current_page?: number;
  results?: T[];
};

export function unwrapResults<T>(payload: T[] | PaginatedResponse<T>): T[] {
  if (Array.isArray(payload)) return payload;
  return payload.results || [];
}

export async function fetchAllPages<T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T[]> {
  const firstPath = endpoint.includes("?")
    ? `${endpoint}&limit=100`
    : `${endpoint}?limit=100`;
  let nextUrl: string | null = firstPath;
  const items: T[] = [];

  while (nextUrl) {
    const response: AxiosResponse<T[] | PaginatedResponse<T>> =
      await apiClient.get<T[] | PaginatedResponse<T>>(nextUrl, {
        signal,
      });
    const data: T[] | PaginatedResponse<T> = response.data;
    items.push(...unwrapResults<T>(data));

    if (Array.isArray(data)) {
      nextUrl = null;
    } else if (data.links?.next) {
      nextUrl = data.links.next.replace(API_BASE_URL, "");
    } else {
      nextUrl = null;
    }
  }

  return items;
}
