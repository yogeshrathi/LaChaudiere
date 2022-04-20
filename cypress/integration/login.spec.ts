describe('Login', () => {
    it('Should not login if the form is invalid', () => {
      cy.visit('/');
      cy.url().should('includes', 'login');
      cy.get('[formControlName="clientId"]').type('LC01');
      cy.get('#login').click();
      cy.url().should('not.include', 'admin/portal');
    });
  
    it('Should login if the form is valid', () => {
      cy.login('LC01', 'Yogesh@123');
      cy.url().should('include', 'admin/portal');
    });
  });
  