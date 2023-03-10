import { VolunteerPage } from '../support/volunteer-page.po';

const page = new VolunteerPage();

describe('Volunteer Page', () => {
  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getPageTitle().should('have.text', 'Volunteer Page');
  });
});
