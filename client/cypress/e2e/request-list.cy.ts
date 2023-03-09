import { RequestListPage } from '../support/request-list.po';

const page = new RequestListPage();

describe('Request list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getRequestTitle().should('have.text', 'Requests');
  });

  it('Should show 2 requests in both card and list view', () => {
    page.getRequestCards().should('have.length', 2);
    page.getRequestListItems().should('have.length', 2);
  });

});
