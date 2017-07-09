import { ImportPPSAppPage } from './app.po';

describe('import-ppsapp App', () => {
  let page: ImportPPSAppPage;

  beforeEach(() => {
    page = new ImportPPSAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
