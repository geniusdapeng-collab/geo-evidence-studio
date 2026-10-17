const DEFAULT_BASE_URL = "http://127.0.0.1:4317";

export const TOOL_PATTERNS = [
  "visibility.collect",
  "answer.structure",
  "citation.fetch",
  "geo.rewrite",
  "geo_queue.emit",
  "rpa.source_publish",
  "archive.write_back",
];

function compactError(error) {
  return error instanceof Error ? error.message : String(error);
}

export function createToolExecutorForScope(scope = {}) {
  const baseUrl = String(process.env.GEO_EVIDENCE_STUDIO_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  const token = String(process.env.GEO_EVIDENCE_STUDIO_TOKEN ?? "");
  const timeoutMs = Number(process.env.GEO_EVIDENCE_STUDIO_TIMEOUT_MS ?? 120_000);

  return async (name, params = {}) => {
    if (!TOOL_PATTERNS.includes(name)) {
      return {
        result: { state: "connector-required", tool: name },
        receipt: { synced: false, mode: "real" },
      };
    }
    try {
      const response = await fetch(`${baseUrl}/api/tool`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, params, scope }),
        signal: AbortSignal.timeout(Number.isFinite(timeoutMs) ? timeoutMs : 120_000),
      });
      const payload = await response.json();
      if (!response.ok) {
        return {
          result: { state: "connector-error", tool: name, error: payload.error ?? `HTTP ${response.status}` },
          receipt: { synced: false, mode: "real", error: payload.error ?? `HTTP ${response.status}` },
        };
      }
      return {
        result: payload.result ?? payload,
        receipt: payload.receipt ?? { synced: false, mode: "real" },
      };
    } catch (error) {
      const message = compactError(error);
      return {
        result: { state: "connector-error", tool: name, error: message },
        receipt: { synced: false, mode: "real", error: message },
      };
    }
  };
}
