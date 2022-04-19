describe("My First Test", () => {
    it("Visits the initial project page", () => {
      cy.visit("/login")
      cy.get("h2").should("contain.text", "Login");
    })
  })
  