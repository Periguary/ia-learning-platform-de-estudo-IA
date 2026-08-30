import { describe, expect, it } from "vitest";
import { createServer } from "http";
import { getViteHmrOptions } from "./vite";

describe("Vite HMR behind the preview proxy", () => {
  it("uses the public secure WebSocket endpoint instead of localhost:5173", () => {
    const server = createServer();
    const options = getViteHmrOptions(server);

    expect(options).toEqual({ server, protocol: "wss", clientPort: 443 });
    expect(options.protocol).toBe("wss");
    expect(options.clientPort).toBe(443);
  });
});
