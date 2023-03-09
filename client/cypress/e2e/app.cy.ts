import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'CSCI 3601 Iteration Template');
  });

  it('The sidenav should open, navigate to "Users", "Requests", "Volunteer View", "Client View" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden');
    page.getSidenavButton()
      .should('be.visible');

    page.getSidenavButton().click();
    page.getNavLink('Users').click();
    cy.url().should('match', /\/users$/);
    page.getSidenav()
      .should('be.hidden');

    page.getSidenavButton().click();
    page.getNavLink('Requests').click();
    cy.url().should('match', /\/requests$/);
    page.getSidenav()
      .should('be.hidden');

    page.getSidenavButton().click();
      page.getNavLink('Volunteer View').click();
      cy.url().should('match', /\/volunteer$/);
      page.getSidenav()
        .should('be.hidden');

    page.getSidenavButton().click();
      page.getNavLink('Client View').click();
      cy.url().should('match', /\/client$/);
      page.getSidenav()
        .should('be.hidden');


    // Try to navigate to Home
    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^/]+\/?$/);
    page.getSidenav()
      .should('be.hidden');
  });

});
