import { HoursAppPage } from './app.po';

describe('hours-app App', () => {
  let page: HoursAppPage;

  beforeEach(() => {
    page = new HoursAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
