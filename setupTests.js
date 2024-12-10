import { beforeAll, afterAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./src/mocks/server";

beforeAll(() => server.listen());
console.warn = vi.fn();
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
