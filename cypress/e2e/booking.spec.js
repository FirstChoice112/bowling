describe("Booking system", () => {
  beforeEach(() => {
    // Intercepta API-anropet för bokning
    cy.intercept("POST", "/api/Booking", (req) => {
      const { people, lanes } = req.body;
      const total = people * 120 + lanes * 100;
      req.reply({
        statusCode: 201,
        body: {
          id: "ABC123", // Bokningsnummer
          price: total, // Total summa
          when: "2024-12-15T12:00", // När
          people: "4", // Antal personer
          lanes: "2", // Antal banor
        },
      });
    }).as("createBooking");

    // Besök bokningssidan
    cy.visit("/Booking");
  });

  it("should allow the user to complete a booking and see the booking number and total amount", () => {
    // Fyll i antalet spelare och banor
    cy.get("#people").should("be.visible").type("4"); // 4 spelare
    cy.get("#lanes").should("be.visible").type("2"); // 2 banor
    cy.get("#time").should("be.visible").type("12:00"); // Tid
    cy.get("#date").should("be.visible").type("2024-12-15"); // Datum

    // Klicka på knappen för att slutföra bokningen
    cy.get(".booking__button").click();

    // Vänta på API-anropet
    cy.wait("@createBooking");

    // Vänta tills bekräftelsesidan är synlig och kontrollera URL
    cy.url().should("include", "/Confirmation");

    // Kontrollera bokningsnummer och total summa
    cy.get("#bookingNumber").should("be.visible").and("have.value", "ABC123");

    const totalPrice = 4 * 120 + 2 * 100; // 480 + 200 = 680
    cy.get(".confirmation__price p")
      .last()
      .should("contain", `${totalPrice} sek`);

    // Kontrollera att uppdelningen mellan spelare och banor visas korrekt
    cy.get(".confirmation__input-group").within(() => {
      cy.get("#when").should("have.value", "2024-12-15 12:00");
      cy.get("#people").should("have.value", "4");
      cy.get("#lanes").should("have.value", "2");
    });

    // Kontrollera att kostnaden per spelare och bana är korrekt
    cy.get(".confirmation__price")
      .should("contain", "480 sek") // Kostnaden för spelare
      .and("contain", "200 sek"); // Kostnaden för banor
  });
});
