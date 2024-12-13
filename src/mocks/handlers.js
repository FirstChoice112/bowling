import { http } from "msw";

export const handlers = [
  http.post("/api/booking", (req, res, ctx) => {
    const { people, lanes } = req.body;
    const total = people * 120 + lanes * 100;
    return res(ctx.status(201), ctx.json({ bookingId: "ABC123", total }));
  }),
];
