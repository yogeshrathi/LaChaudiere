describe("customers", () => {      
      it("should enter the login data", () => {
        cy.visit('/login');
        cy.get('#clientId').type('LC01');
        cy.get('#clientPassword').type('Yogesh@123');
        cy.get('#login')
        .click();
      });
      it("should land on home page", () => {
        cy.visit('/login');
        cy.get('#clientId').type('LC01');
        cy.get('#clientPassword').type('Yogesh@123');
        cy.get('#login')
        .click();
        cy.get("h2").should("contain.text", "Home");
      });
      it("should go to customers page", () => {
        cy.visit('/login');
        cy.get('#clientId').type('LC01');
        cy.get('#clientPassword').type('Yogesh@123');
        cy.get('#login')
        .click();
        cy.get("#customers").click()
      });
      it("should go to add customers page", () => {
        cy.visit('/login');
        cy.get('#clientId').type('LC01');
        cy.get('#clientPassword').type('Yogesh@123');
        cy.get('#login')
        .click();
        cy.get("#customers").click();
        cy.get("#add").click();
      });
      it("should go to save new customers data", () => {
        cy.visit('/login');
        cy.get('#clientId').type('LC01');
        cy.get('#clientPassword').type('Yogesh@123');
        cy.get('#login')
        .click();
        cy.get("#customers").click();
        cy.get("#add").click();
        cy.get('#clientId').type('LC012');
        cy.get('#name').type('Jane');
        cy.get('#email').type('abc3@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#confirmPassword').type('12345678');
        cy.get('#phone').type('9876543210');
        cy.get('#address').type('AP');
        cy.get('#postalCode').type('517305');
        cy.get('#city').type('city');
        cy.get('#companyName').type('PS');
        cy.get("#admin").click();
        cy.get('#location').type('PS');
        cy.get("#saveCustomer").click();
        cy.get("h3").should("contain.text", "Manage Customers");
      });
  })