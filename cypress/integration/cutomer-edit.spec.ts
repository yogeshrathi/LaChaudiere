describe("login", () => {
    it("Visits login page and enter details", () => {
        cy.login('LC01', 'Yogesh@123');
        // cy.url().should('includes', 'admin/portal');
        // cy.get("h2").should("contain.text", "Home");
        // cy.get('app-portal .cust').click();
        // cy.url().should('includes', 'admin/customers');
        // cy.get(".editcust").first().click();
        // cy.get('.editcust').click({ multiple: true, force:true });
        // cy.contains('a')
        //     .parent()
        //     .find('.editcust')
        //     .click()




    })

    it("visits admin portal page", () => {
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
    })

    it("visits admin customer page", () => {
        cy.login('LC01', 'Yogesh@123');
        cy.get('app-portal .cust').click();
        cy.url().should('includes', 'admin/customers');
        cy.get('#customers_2').click();
    })

    it("delete item",()=>{
        cy.login('LC01', 'Yogesh@123');
        cy.get('app-portal .cust').click();
        cy.url().should('includes', 'admin/customers');
        cy.get('#delete_LC744').click();
        cy.get('#delete_LC744').should('not.exist');
    })

    
})
