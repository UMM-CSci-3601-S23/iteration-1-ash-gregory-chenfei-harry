export class VolunteerPage {
  private readonly baseUrl = '/volunteer';
  private readonly pageTitle = '.volunteer-page-title';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  /**
   * Gets the title of the page when visiting the `/volunteer` page.
   *
   * @returns the value of the element with the ID stored in `pageTitle`
   */
  getPageTitle() {
    return cy.get(this.pageTitle);
  }
}
