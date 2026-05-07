import { apiClient, fetchAllPages, unwrapResults } from "@/services/api";
import type { Company, CompanyResponse } from "@/types/company";

export async function fetchCompanies(signal?: AbortSignal): Promise<Company[]> {
  return fetchAllPages<Company>("/companies/", signal);
}

export async function fetchCompanyProfile(
  signal?: AbortSignal,
): Promise<Company | null> {
  const response = await apiClient.get<Company | CompanyResponse>(
    "/companies/",
    { signal },
  );
  const companies = unwrapResults(response.data as Company[] | CompanyResponse);
  return (
    companies.find((company) =>
      (company.name || "").toLowerCase().includes("ctrl bits"),
    ) ||
    companies.find((company) => company.website === "https://ctrlbits.com") ||
    null
  );
}
