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
        cy.get('#623576674ed8813db41ee1aa').click();
        cy.get('#623576674ed8813db41ee1aa').should('not.exist');
    })
})

describe("Search Product", () => {
    it("search rainbow", () => {    
        cy.login('LC01', 'Yogesh@123');
        cy.get('app-portal .prod').click();
        cy.url().should('includes', 'admin/products');
        cy.wait(5000);
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').clear().type("Rainbow");
    });
});



