const { test, expect } = require('@playwright/test');

test('Checks that page can be opened', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    const isLogoVisible = await page.isVisible('#logo_homepage_link');
  
    expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and result are correct', async ({ page }) => {
    await page.goto('https://start.duckduckgo.com/');
    await page.waitForSelector('#logo_homepage_link');
    await page.fill('#search_form_input_homepage','Test');
    await page.click('#search_button_homepage');
    const rezultatasTextContent = await page.textContent('#r1-0');
  
    expect(rezultatasTextContent).toContain('Test');
});

test('Inspector recording', async ({ page }) => {
    await page.goto('https://start.duckduckgo.com/');
    await page.fill('input[name="q"]', 'Test');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&ia=web' }*/),
        page.click('input:has-text("S")')
  ]);
  const rezultatasTextContent = await page.textContent('#r1-0');
  expect(rezultatasTextContent).toContain('Test');
});

test('Testing if miscrosoft word cheat sheets are working', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    await page.fill('#search_form_input_homepage', 'ms word cheat sheet');
    await page.click('#search_button_homepage');

    const textContent = await page.textContent('.c-base__title');
    const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    expect(isCheatSheetsVisible).toBe(true);
    expect(textContent).toContain("Microsoft Word 2010");
});

test('Testing if page shortener proceed ', async ({ page }) => {
    await page.goto('https://start.duckduckgo.com');
    await page.waitForSelector('#logo_homepage_link');
    await page.fill ('#search_form_input_homepage', 'shorten www.wikipedia.com');
    await page.click('#search_button_homepage');

    const shorterPage = await page.getAttribute('#shorten-url', 'value');
    await page.goto(shorterPage);

    const webPage = page.url();
    expect(webPage).toBe('https://www.wikipedia.org/');
});
test('panda', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage", { force: true });
  await page.waitForNavigation();
      const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
      console.log(results);
  results.forEach(result => {
    expect(result.toLowerCase()).toContain("panda");
  });
});
    const invalidPasswordLengths = ['7', '65'];
  invalidPasswordLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password`, async ({ page }) => {
      await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const isPasswordElementVisible = await page.isVisible(".c-base__sub");
      expect(isPasswordElementVisible).toEqual(false)
    });
  });