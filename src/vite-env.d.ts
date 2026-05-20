/// <reference types="vite/client" />

type WebMCPToolResult = {
  content?: Array<{
    type: "text";
    text: string;
  }>;
  [key: string]: unknown;
};

type WebMCPClient = {
  requestUserInteraction?: <T>(callback: () => T | Promise<T>) => Promise<T>;
};

type WebMCPTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (
    input: Record<string, unknown>,
    client?: WebMCPClient,
  ) => WebMCPToolResult | Promise<WebMCPToolResult>;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
  };
};

type WebMCPToolRegistration = {
  unregister?: () => void;
};

type ModelContext = {
  provideContext?: (context: { tools: WebMCPTool[] }) => void;
  provideTools?: (tools: WebMCPTool[]) => void;
  clearContext?: () => void;
  registerTool?: (
    tool: WebMCPTool,
    options?: { signal?: AbortSignal },
  ) => WebMCPToolRegistration | void;
  unregisterTool?: (name: string) => void;
};

interface Navigator {
  modelContext?: ModelContext;
}
