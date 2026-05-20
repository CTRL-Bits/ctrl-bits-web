const SITE_URL = "https://www.ctrlbits.com";
const SERVER_INFO = {
  name: "Ctrl Bits Website MCP",
  version: "1.0.0",
};

const resources = [
  {
    uri: `${SITE_URL}/.well-known/api-catalog`,
    name: "API Catalog",
    description: "RFC 9727 API catalog for Ctrl Bits public APIs.",
    mimeType: "application/linkset+json",
  },
  {
    uri: `${SITE_URL}/.well-known/openapi.json`,
    name: "OpenAPI Description",
    description: "OpenAPI description for Ctrl Bits public API endpoints.",
    mimeType: "application/vnd.oai.openapi+json",
  },
  {
    uri: `${SITE_URL}/docs/api`,
    name: "API Documentation",
    description: "Markdown documentation for Ctrl Bits public API endpoints.",
    mimeType: "text/markdown",
  },
  {
    uri: `${SITE_URL}/llm.txt`,
    name: "LLM Summary",
    description: "Machine-readable summary of Ctrl Bits company, services, and key pages.",
    mimeType: "text/plain",
  },
  {
    uri: `${SITE_URL}/.well-known/agent-skills/index.json`,
    name: "Agent Skills Index",
    description: "Agent Skills Discovery RFC v0.2.0 index for Ctrl Bits skills.",
    mimeType: "application/json",
  },
];

const resourceContent = new Map([
  [
    `${SITE_URL}/.well-known/api-catalog`,
    {
      mimeType: "application/linkset+json",
      text: "See https://www.ctrlbits.com/.well-known/api-catalog for the current RFC 9727 API catalog.",
    },
  ],
  [
    `${SITE_URL}/.well-known/openapi.json`,
    {
      mimeType: "application/vnd.oai.openapi+json",
      text: "See https://www.ctrlbits.com/.well-known/openapi.json for the current OpenAPI description.",
    },
  ],
  [
    `${SITE_URL}/docs/api`,
    {
      mimeType: "text/markdown",
      text: "See https://www.ctrlbits.com/docs/api for Ctrl Bits public API documentation.",
    },
  ],
  [
    `${SITE_URL}/llm.txt`,
    {
      mimeType: "text/plain",
      text: "See https://www.ctrlbits.com/llm.txt for the current Ctrl Bits machine-readable site summary.",
    },
  ],
  [
    `${SITE_URL}/.well-known/agent-skills/index.json`,
    {
      mimeType: "application/json",
      text: "See https://www.ctrlbits.com/.well-known/agent-skills/index.json for the current Agent Skills discovery index.",
    },
  ],
]);

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function rpcResult(id, result) {
  return {
    jsonrpc: "2.0",
    id,
    result,
  };
}

function rpcError(id, code, message) {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
    },
  };
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : null;
}

function handleRpc(message) {
  const { id, method, params } = message || {};

  if (!method) {
    return rpcError(id ?? null, -32600, "Invalid Request");
  }

  if (id === undefined || id === null) {
    return null;
  }

  switch (method) {
    case "initialize":
      return rpcResult(id, {
        protocolVersion: params?.protocolVersion || "2025-06-18",
        capabilities: {
          resources: {
            listChanged: false,
          },
          tools: {
            listChanged: false,
          },
        },
        serverInfo: SERVER_INFO,
      });

    case "resources/list":
      return rpcResult(id, {
        resources,
      });

    case "resources/read": {
      const uri = params?.uri;
      const entry = resourceContent.get(uri);
      if (!entry) return rpcError(id, -32002, "Resource not found");

      return rpcResult(id, {
        contents: [
          {
            uri,
            mimeType: entry.mimeType,
            text: entry.text,
          },
        ],
      });
    }

    case "tools/list":
      return rpcResult(id, {
        tools: [],
      });

    case "prompts/list":
      return rpcResult(id, {
        prompts: [],
      });

    default:
      return rpcError(id, -32601, "Method not found");
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, MCP-Protocol-Version");
    res.end();
    return;
  }

  if (req.method === "GET") {
    sendJson(res, 200, {
      serverInfo: SERVER_INFO,
      capabilities: {
        resources: {
          listChanged: false,
        },
        tools: {
          listChanged: false,
        },
      },
      serverCard: `${SITE_URL}/.well-known/mcp/server-card.json`,
    });
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.end("Method Not Allowed");
    return;
  }

  try {
    const body = await readJson(req);
    const messages = Array.isArray(body) ? body : [body];
    const responses = messages.map(handleRpc).filter(Boolean);

    if (responses.length === 0) {
      res.statusCode = 202;
      res.end();
      return;
    }

    sendJson(res, 200, Array.isArray(body) ? responses : responses[0]);
  } catch {
    sendJson(res, 400, rpcError(null, -32700, "Parse error"));
  }
}
