import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SITE_URL = "https://www.ctrlbits.com";

const ROUTES = {
  home: "/",
  solutions: "/solutions",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

const SERVICES = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Business websites, landing pages, CMS builds, ecommerce websites, and SEO-ready site architecture.",
  },
  {
    id: "app-development",
    title: "App Development",
    description:
      "Web applications, mobile applications, secure APIs, user flows, dashboards, and product builds.",
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "Internal tools, client portals, admin dashboards, workflow systems, and integration-heavy applications.",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User research, wireframes, interface design, design systems, product flows, and usability improvements.",
  },
  {
    id: "creative-services",
    title: "Creative Services",
    description:
      "Video production, graphic design, branding, animation, and illustration.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "SEO, local SEO, content strategy, paid advertising, and conversion-focused growth campaigns.",
  },
];

type RouteKey = keyof typeof ROUTES;

function textResult(text: string, extra: Record<string, unknown> = {}): WebMCPToolResult {
  return {
    content: [{ type: "text", text }],
    ...extra,
  };
}

function getString(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

function getRoute(input: Record<string, unknown>): string {
  const page = getString(input, "page") as RouteKey;
  const projectSlug = getString(input, "projectSlug");

  if (projectSlug) return `/projects/${encodeURIComponent(projectSlug)}`;
  return ROUTES[page] || ROUTES.home;
}

function createTools(navigate: ReturnType<typeof useNavigate>): WebMCPTool[] {
  return [
    {
      name: "ctrlbits.navigate",
      title: "Navigate Ctrl Bits",
      description:
        "Navigate the current browser tab to a key Ctrl Bits page or project detail page.",
      inputSchema: {
        type: "object",
        properties: {
          page: {
            type: "string",
            enum: Object.keys(ROUTES),
            description: "The main site page to open.",
          },
          projectSlug: {
            type: "string",
            description:
              "Optional project slug. When provided, opens /projects/{projectSlug}.",
          },
        },
        additionalProperties: false,
      },
      execute: (input) => {
        const route = getRoute(input);
        navigate(route);
        return textResult(`Navigated to ${route}.`, {
          route,
          url: `${SITE_URL}${route}`,
        });
      },
    },
    {
      name: "ctrlbits.getDiscoveryResources",
      title: "Get Discovery Resources",
      description:
        "Return machine-readable discovery resources for Ctrl Bits, including API catalog, OAuth metadata, MCP server card, and agent skills index.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
      },
      execute: () =>
        textResult("Returned Ctrl Bits discovery resources.", {
          resources: {
            apiCatalog: `${SITE_URL}/.well-known/api-catalog`,
            openApi: `${SITE_URL}/.well-known/openapi.json`,
            apiDocs: `${SITE_URL}/docs/api`,
            oauthAuthorizationServer: `${SITE_URL}/.well-known/oauth-authorization-server`,
            oauthProtectedResource: `${SITE_URL}/.well-known/oauth-protected-resource`,
            mcpServerCard: `${SITE_URL}/.well-known/mcp/server-card.json`,
            mcpEndpoint: `${SITE_URL}/mcp`,
            agentSkills: `${SITE_URL}/.well-known/agent-skills/index.json`,
            markdownHint: "Send Accept: text/markdown to receive markdown pages.",
          },
        }),
    },
    {
      name: "ctrlbits.findService",
      title: "Find Ctrl Bits Service",
      description:
        "Find Ctrl Bits service information by service id or free-text query.",
      inputSchema: {
        type: "object",
        properties: {
          service: {
            type: "string",
            enum: SERVICES.map((service) => service.id),
            description: "Optional canonical service id.",
          },
          query: {
            type: "string",
            description: "Optional free-text search query.",
          },
        },
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
      },
      execute: (input) => {
        const selectedService = getString(input, "service");
        const query = getString(input, "query").toLowerCase();
        const matches = SERVICES.filter((service) => {
          if (selectedService) return service.id === selectedService;
          if (!query) return true;
          return `${service.title} ${service.description} ${service.id}`
            .toLowerCase()
            .includes(query);
        });

        return textResult(`Found ${matches.length} matching Ctrl Bits services.`, {
          services: matches,
          nextStep: `${SITE_URL}/contact`,
        });
      },
    },
    {
      name: "ctrlbits.startProjectInquiry",
      title: "Start Project Inquiry",
      description:
        "Prepare a project inquiry draft and navigate to the Ctrl Bits contact page for the user to review and submit.",
      inputSchema: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: SERVICES.map((service) => service.id),
            description: "Primary service area for the project.",
          },
          summary: {
            type: "string",
            description: "Short summary of the project goal.",
          },
          timeline: {
            type: "string",
            description: "Desired timeline or launch window.",
          },
          budgetRange: {
            type: "string",
            description: "Optional budget range.",
          },
        },
        required: ["summary"],
        additionalProperties: false,
      },
      execute: async (input, client) => {
        const draft = {
          serviceType: getString(input, "serviceType"),
          summary: getString(input, "summary"),
          timeline: getString(input, "timeline"),
          budgetRange: getString(input, "budgetRange"),
          createdAt: new Date().toISOString(),
        };

        const openContactPage = () => {
          window.sessionStorage.setItem(
            "ctrlbits:webmcp-project-inquiry",
            JSON.stringify(draft),
          );
          navigate(ROUTES.contact);
          return true;
        };

        if (client?.requestUserInteraction) {
          await client.requestUserInteraction(openContactPage);
        } else {
          openContactPage();
        }

        return textResult(
          "Prepared a project inquiry draft and opened the contact page for user review.",
          {
            route: ROUTES.contact,
            url: `${SITE_URL}${ROUTES.contact}`,
            draft,
          },
        );
      },
    },
  ];
}

function registerWebMCPTools(tools: WebMCPTool[]): () => void {
  const modelContext = navigator.modelContext;
  if (!modelContext) return () => undefined;

  if (typeof modelContext.provideContext === "function") {
    navigator.modelContext?.provideContext?.({ tools });
    return () => modelContext.clearContext?.();
  }

  if (typeof modelContext.provideTools === "function") {
    modelContext.provideTools(tools);
    return () => modelContext.clearContext?.();
  }

  if (typeof modelContext.registerTool === "function") {
    const controller = new AbortController();
    const unregisterCallbacks: Array<() => void> = [];

    tools.forEach((tool) => {
      try {
        modelContext.unregisterTool?.(tool.name);
      } catch {
        // Best-effort cleanup for older preview implementations.
      }

      const registration = modelContext.registerTool?.(tool, {
        signal: controller.signal,
      });
      if (registration?.unregister) unregisterCallbacks.push(registration.unregister);
    });

    return () => {
      controller.abort();
      unregisterCallbacks.forEach((unregister) => unregister());
      tools.forEach((tool) => modelContext.unregisterTool?.(tool.name));
    };
  }

  return () => undefined;
}

export default function WebMCPProvider() {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined" || !("modelContext" in navigator)) {
      return undefined;
    }

    return registerWebMCPTools(createTools(navigate));
  }, [navigate]);

  return null;
}
