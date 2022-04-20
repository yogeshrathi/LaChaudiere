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
        cy.get('#delete_LC1865').click();
        cy.get('#delete_LC1865').should('not.exist');
    })
    
})

describe("Customer edit scenarios", () => {
    it("login as admin", () => {
        cy.login('LC01', 'Yogesh@123');
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
    })

    it("open manage customer page ", () => {
        cy.get('app-portal #customers').click();
        cy.url().should('includes', 'admin/customers');
    })

    it("search and open desired customer", () => {
        cy.xpath('/html/body/app-root/app-admin/app-customers/section/div/div[1]/form/input').type('LC3879');
        cy.xpath('//*[@id="customers_0"]').click();
    });

    it("search and open desired customer", () => {
        cy.get('#clientId').type('LC3879');
        cy.get('#name').type('TANIA CHAMPAGNE');
        cy.get('#email').type('epicerieshenley@hotmail.com');
        cy.get('#password').type('12345678');
        cy.get('#confirmPassword').type('12345678');
        cy.get('#phone').type('(418)485-6813');
        cy.get('#address').type('441, RUE PRINCIPALE');
        cy.get('#postalCode').type('G0M 1V0');
        cy.get('#city').type('ST-HONORE');
        cy.get('#client').type('Client');
        cy.get('#location').type('62');
        cy.get('#monday').type('monday');
        cy.get('#saveCustomer').click();
    });

    // it("search and open editted product", () => {
    //     cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').clear().type("iPhone 13 Pro");
    //     cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[2]/div[2]/div[4]/a').click();
    // });

    // it("verify if product is editted", () => {
    //     cy.get('input[name="product_name"]').should('have.value','iPhone 13 Pro');
    //     cy.get('input[name="imageUrl"]').should('have.value','https://www.deccanherald.com/sites/dh/files/articleimages/2021/10/26/aiphone13pm-fcvs-sel-1-1037991-1635242483.jpg');
    //     cy.get('input[name="description"]').should('have.value','Apple\'s latest model');
    // });
})

