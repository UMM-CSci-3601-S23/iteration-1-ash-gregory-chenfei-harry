
export class RequestListPage {
  private readonly baseUrl = '/requests';
  private readonly pageTitle = '.request-list-title';
  private readonly requestCardSelector = '.request-cards-container app-request-card';
  private readonly requestListItemsSelector = '.request-nav-list .request-list-item';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getRequestTitle() {
    return cy.get(this.pageTitle);
  }


   getRequestCards() {
    return cy.get(this.requestCardSelector);
  }

  getRequestListItems() {
    return cy.get(this.requestListItemsSelector);
  }

}
