describe("product add scenario", () => {
    it("login as admin", () => {
        cy.login('LC01', 'Yogesh@123');
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
    })

    it("open manage products page page", () => {
        cy.get('app-portal .prod').click();
        cy.url().should('includes', 'admin/products');
    })

    it("open add product modal", () => {
        cy.get('#add-new-product').click();
        cy.get(".modal-header h4").should("contain.text", " Add New Product ");
    });

    it("enter product details", () => {
        cy.get('input[name="product_name"]').type('iPhone 13 Max Pro');
        cy.get('input[name="imageUrl"]').type('https://www.deccanherald.com/sites/dh/files/articleimages/2021/10/26/aiphone13pm-fcvs-sel-1-1037991-1635242483.jpg');
        cy.get('input[name="description"]').type('Apple\'s latest model');
        cy.get('input[name="isAvailable"]').check({ force: true })
        cy.get('input[type=submit]').click();
    });

    it("verify if product is added", () => {
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').type("iPhone 13 Max Pro");
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[2]/div[2]/div[2]').should("contain.text", "iPhone 13 Max Pro");
    });
})

describe("product edit scenarios", () => {
    it("login as admin", () => {
        cy.login('LC01', 'Yogesh@123');
        cy.url().should('includes', 'admin/portal');
        cy.get("h2").should("contain.text", "Home");
    })

    it("open manage products page page", () => {
        cy.get('app-portal .prod').click();
        cy.url().should('includes', 'admin/products');
    })
})
