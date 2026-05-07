import { fetchPublishedPosts } from "@/services/blogService";
import type { Insight } from "@/types/insight";

export async function fetchInsights(signal?: AbortSignal): Promise<Insight[]> {
  return fetchPublishedPosts(signal);
}
