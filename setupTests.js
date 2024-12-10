import { beforeAll, afterAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./src/mocks/server";

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => {
  console.log("Stopping server...");

  server.close();
});
