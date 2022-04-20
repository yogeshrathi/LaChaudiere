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
        cy.get('input[name="product_name"]').type('iPhone 13');
        cy.get('input[name="imageUrl"]').type('https://www.imore.com/sites/imore.com/files/styles/xlarge_wm_brw/public/field/image/2021/09/iphone-13-and-mini-dark-and-light-hero.jpeg');
        cy.get('input[name="description"]').type('Apple\'s new model');
        cy.get('input[name="isAvailable"]').check({ force: true })
        cy.get('input[type=submit]').click();
    });

    it("verify if product is added", () => {
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').type("iPhone 13");
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[2]/div[2]/div[2]').should("contain.text", "iPhone 13");
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

    it("search and open desired product", () => {
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').type("iPhone 13");
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[2]/div[2]/div[4]/a').click();
    });

    it("search and open desired product", () => {
        cy.get('input[name="product_name"]').type(' Pro');
        cy.get('input[name="imageUrl"]').clear().type('https://www.deccanherald.com/sites/dh/files/articleimages/2021/10/26/aiphone13pm-fcvs-sel-1-1037991-1635242483.jpg');
        cy.get('input[name="description"]').clear().type('Apple\'s latest model');
        cy.get('input[type=submit]').click();
    });

    it("search and open editted product", () => {
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[1]/form/input').clear().type("iPhone 13 Pro");
        cy.xpath('/html/body/app-root/app-admin/app-products/section/div/div[2]/div[2]/div[4]/a').click();
    });

    it("verify if product is editted", () => {
        cy.get('input[name="product_name"]').should('have.value','iPhone 13 Pro');
        cy.get('input[name="imageUrl"]').should('have.value','https://www.deccanherald.com/sites/dh/files/articleimages/2021/10/26/aiphone13pm-fcvs-sel-1-1037991-1635242483.jpg');
        cy.get('input[name="description"]').should('have.value','Apple\'s latest model');
    });
})
