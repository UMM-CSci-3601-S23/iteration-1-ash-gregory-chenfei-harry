import { VolunteerPage } from '../support/volunteer-page.po';

const page = new VolunteerPage();

describe('Volunteer Page', () => {
  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getPageTitle().should('have.text', 'Volunteer Page');
  });

  it('Should enable and disable the add request button', () => {
    // ADD REQUEST button should be disabled until all the necessary fields
    // are filled. Once the last (`priority`) is filled, then the button should
    // become enabled.
    page.addRequestButton().should('be.disabled');
    page.getFormField('name').type('Banana');
    page.addRequestButton().should('be.disabled');
    page.getFormField('unit').type('item');
    page.addRequestButton().should('be.disabled');
    page.getFormField('count').type('20');
    page.addRequestButton().should('be.disabled');
    page.getFormField('price').clear().type('2');
    page.addRequestButton().should('be.disabled');
    page.getFormField('priority').clear().type('top');
    page.addRequestButton().should('be.disabled');
    page.getFormField('priority').clear().type('1');
    // all the required fields have valid input, then it should be disabled
    page.addRequestButton().should('be.enabled');
  });

});
