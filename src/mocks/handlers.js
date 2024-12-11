import { http } from "msw";

export const handlers = [
  http.post("/api/booking", (req, res, ctx) => {
    const { people, lanes } = req.body;
    const total = people * 120 + lanes * 100;
    return res(ctx.status(201), ctx.json({ bookingId: "ABC123", total }));
  }),
];
/*
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async ({ request }) => {
      const body = await request.json();

      const totalPrice = body.people * 120 + body.lanes * 100;

      const booking = {
        active: true,
        id: "STR9883PCKL",
        price: totalPrice,
        lanes: body.lanes,
        people: body.people,
        shoes: body.shoes,
        when: body.when,
      };

      return HttpResponse.json(booking);
    }
  ),
];

export default handlers;
*/
