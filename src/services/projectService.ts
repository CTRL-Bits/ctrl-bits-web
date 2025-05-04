// src/services/projectService.ts

import { Project } from "@/types";
import axios from "axios";
const API_URL = "https://api.ctrlbits.xyz/api"; // Replace with your actual API base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ProjectsResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  current_page: number;
  results: Project[];
}

/**
 * Fetch all projects
 */
export const fetchProjects = async (): Promise<ProjectsResponse> => {
  try {
    const response = await apiClient.get(`${API_URL}/projects`);

    if (!response) {
      throw new Error(`Error ${response}: ${response}`);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

/**
 * Fetch a single project by slug or ID
 */
export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${slug}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch project with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Fetch projects by category
 */
export const fetchProjectsByCategory = async (
  category: string
): Promise<ProjectsResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/projects?category=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch projects for category ${category}:`, error);
    throw error;
  }
};

/**
 * Fetch featured projects
 */
export const fetchFeaturedProjects = async (): Promise<ProjectsResponse> => {
  try {
    const response = await fetch(`${API_URL}/projects?featured=true`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    throw error;
  }
};
