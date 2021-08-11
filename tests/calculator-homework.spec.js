
//Path to node_modules playwrigh test application
const { test, expect } = require('@playwright/test');
//Path to use pages class
const { CalculatorStartPage } = require('../pages/calculatorStartPage');

//Testing suite - simplified link to testing enviroment
test.describe('Basic Calculator test suite', () => {
    let page;
    let startPage;
  test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        startPage = new CalculatorStartPage(page);
    });
        test.beforeEach(async () => {
            await startPage.goto();
        });

    //Test to check if the calculator form appears
    test('Checks that calculator appears', async () => {
        const doesCalculatorAppears = await page.isVisible('#calcForm');
        expect(doesCalculatorAppears).toBe(true);
    });

    //Defined constants to use in testing
    const arrayForBuilds = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]; //Array for all builds in the page
    //Generating random number
    const firstNumber = Math.floor(Math.random() * 100);
    //Conerting number to string
    const convertToString1 = firstNumber.toString();
    //Generating random number
    const secondNumber = Math.floor(Math.random() * 100);
    //Converting number to string
    const convertToString2 = secondNumber.toString();
    //Defined calculation to test if answer is correct
    const sum = (firstNumber + secondNumber).toString();
    const subtract = (firstNumber - secondNumber).toString();
    const multiply = (firstNumber * secondNumber).toString();
    const divide = (firstNumber / secondNumber).toString();
    //Defined empty are to test if clear button works
    const empty = "";

    //Taking all versions into array and testing each in one test scenario
    arrayForBuilds.forEach((version) => {
        //Testing if all versions of build works properly with operation divide
        test.only(`Test to check 10 versions of build if it is working with operation divide ${version}  `, async () => {
            //Selects option from build dropdown menu
            await page.selectOption("#selectBuild", version);
            //Clicks on number 1 field to make sure that necessary field is selected
            await page.click('#number1Field');
            //Fills random number into number 1 field
            page.fill('#number1Field', convertToString1);
            //Clicks on number 2 field to make sure that necessary field is selected
            await page.click('#number2Field');
            //Fills random number into number 2 field
            page.fill('#number2Field', convertToString2);
            //Selects option "divide" from operation dropdown menu
            await page.selectOption("#selectOperationDropdown", "3");
            //Clicks on calculate button which function is to divide at this particular scenario
            await page.click("#calculateButton"); 

            //Testing if the provided answer is correct
            const fieldAnswer = await page.inputValue("#numberAnswerField");
            expect(fieldAnswer).toBe(divide);
        });
    });

    //Taking all versions into array and testing each in one test scenario
    arrayForBuilds.forEach((versions) => {
    //Testing if all versions of build has properly functioning "clear" button
    test.only(`Test to check 10 versions of build if "clear" button works properly ${versions}  `, async () => {
        await page.selectOption("#selectBuild", versions);
        await page.click('#number1Field');
        page.fill('#number1Field', convertToString1);
        await page.click('#number2Field');
        page.fill('#number2Field', convertToString2);
        await page.selectOption("#selectOperationDropdown", "3");
        await page.click("#calculateButton"); 
        await page.click("#clearButton"); 

        //Testing if the provided answer is correct
          const fieldAnswer = await page.inputValue("#numberAnswerField");
          expect(fieldAnswer).toBe(empty);
        });
    });

    arrayForBuilds.forEach((versionz) => {
        test(`Test to check 10 versions of build if it is working with operation multiply ${versionz}  `, async () => {
          await page.selectOption("#selectBuild", versionz);
          await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
          await page.selectOption("#selectOperationDropdown", "2");
          await page.click("#calculateButton"); 

          const fieldAnswer = await page.inputValue("#numberAnswerField");
          expect(fieldAnswer).toBe(multiply);
        });
    });
    arrayForBuilds.forEach((versionx) => {
        test(`Test to check 10 versions of build if it is working with operation subtract ${versionx}  `, async () => {
          await page.selectOption("#selectBuild", versionx);
          await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
          await page.selectOption("#selectOperationDropdown", "1");
          await page.click("#calculateButton"); 

          const fieldAnswer = await page.inputValue("#numberAnswerField");
          expect(fieldAnswer).toBe(subtract);
        });
    });
    arrayForBuilds.forEach((versionc) => {
        test(`Test to check 10 versions of build if it is working with operation sum ${versionc}  `, async () => {
          await page.selectOption("#selectBuild", versionc);
          await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
          await page.selectOption("#selectOperationDropdown", "0");
          await page.click("#calculateButton"); 

          const fieldAnswer = await page.inputValue("#numberAnswerField");
          expect(fieldAnswer).toBe(sum);
        });
    });
});