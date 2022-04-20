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

    // it("visits admin customer page", () => {
    //     cy.login('LC01', 'Yogesh@123');
    //     cy.get('app-portal #customers').click();
    //     cy.url().should('includes', 'admin/customers');
    //     cy.get('#customers_2').click();
    // })

    it("delete item",()=>{
        cy.login('LC01', 'Yogesh@123');
        cy.get('app-portal #customers').click();
        cy.url().should('includes', 'admin/customers');
        cy.get('#delete_LC8065').click();
        cy.wait(5000);
        cy.get('#delete_LC8065').should('not.exist');
    })
    
})

xdescribe("Customer edit scenarios", () => {
    it("login as admin", () => {
        cy.login('LC01', 'Yogesh@123');
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
        cy.get('app-portal #customers').click();
        cy.url().should('includes', 'admin/customers')
    })


    it("search desired customer", () => {
        cy.wait(10000);
        cy.xpath('/html/body/app-root/app-admin/app-customers/section/div/div[1]/form/input').clear().type('LC3879');
        cy.xpath('//*[@id="customers_0"]').click();
    });

    it("open edit modal", () => {
        cy.get('#clientId').clear().type('LC3879');
        cy.get('#name').clear().type('TANIA CHAMPAGNE');
        cy.get('#email').clear().type('epicerieshenley@hotmail.com');
        cy.get('#password').clear().type('12345678');
        cy.get('#confirmPassword').clear().type('12345678');
        cy.get('#phone').clear().type('(418)485-6813');
        cy.get('#address').clear().type('441, RUE PRINCIPALE');
        cy.get('#postalCode').clear().type('G0M 1V0');
        cy.get('#city').clear().type('ST-HONORE');
        cy.get('#companyName').clear().type('testing');
        cy.get('#location').clear().type('62');
        cy.get('input[type=submit]').click();
    });

    it("search and open editted customer", () => {
        cy.xpath('/html/body/app-root/app-admin/app-customers/section/div/div[1]/form/input').clear().type("LC3879");
        cy.xpath('//*[@id="customers_0"]').click();
    });

    it("verify if customer is editted", () => {
        cy.get('#clientId').should('have.value','LC3879');
        cy.get('#name').should('have.value','TANIA CHAMPAGNE');
        cy.get('#email').should('have.value','epicerieshenley@hotmail.com');
        cy.get('#password').should('have.value','12345678');
        cy.get('#confirmPassword').should('have.value','12345678');
        cy.get('#phone').should('have.value','(418)485-6813');
        cy.get('#address').should('have.value','441, RUE PRINCIPALE');
        cy.get('#postalCode').should('have.value','G0M 1V0');
        cy.get('#city').should('have.value','ST-HONORE');
        cy.get('#companyName').should('have.value','testing');
        cy.get('#location').should('have.value','62');
    });
})

