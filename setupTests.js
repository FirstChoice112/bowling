import "@testing-library/jest-dom"; // Gör Jest-dom matchers tillgängliga globalt
import { server } from "./mocks/server"; // Om du använder Mock Service Worker för att mocka API-anrop

// Starta Mock Service Worker innan alla tester körs
beforeAll(() => server.listen());

// Återställ eventuella mock-funktioner efter varje test
afterEach(() => {
  server.resetHandlers(); // Återställ API-handlerar om du mockar API
  cleanup(); // Städa upp från React Testing Library
});

// Stäng ner Mock Service Worker när alla tester är klara
afterAll(() => server.close());
