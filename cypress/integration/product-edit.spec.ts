describe("login", () => {
    it("Visits login page and enter details", () => {
        cy.login('LC01', 'Yogesh@123');
    })

    it("visits admin portal page", () => {
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
    })

    it("open products page", () => {
        cy.get('app-portal .prod').click();
        cy.url().should('includes', 'admin/products');
    })

    it("delete product",()=>{
        cy.login('LC01', 'Yogesh@123');
        cy.get('app-portal .prod').click();
        cy.url().should('includes', 'admin/products');
        cy.get('#623576cf4ed8813db41ee1b0').click();
        cy.get('#Test 1').should('not.exist');
    })
    it("search product", () => {
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').clear().type("Rainbow");
    });
    
})



