export class VolunteerPage {
  private readonly baseUrl = '/volunteer';
  private readonly pageTitle = '.volunteer-page-title';
  private readonly button = '[data-test=confirmAddRequestButton]';
  private readonly formFieldSelector = `mat-form-field`;

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

  addRequestButton() {
    return cy.get(this.button);
  }
  getFormField(fieldName: string) {
    return cy.get(`${this.formFieldSelector} [formcontrolname=${fieldName}]`);
  }
}
