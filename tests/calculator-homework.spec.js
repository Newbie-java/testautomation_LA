
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
    test.only('Checks that calculator appears', async () => {
        const doesCalculatorAppears = await page.isVisible('#calcForm');
        expect(doesCalculatorAppears).toBe(true);
    });

    //Defined constants to use in testing
    const firstNumber = Math.floor(Math.random() * 100);
    const secondNumber = Math.floor(Math.random() * 100);
    const convertToString1 = firstNumber.toString();
    const convertToString2 = secondNumber.toString();
    const sum = (firstNumber + secondNumber).toString();
    const subtract = (firstNumber - secondNumber).toString();
    const multiply = (firstNumber * secondNumber).toString();
    const divide = (firstNumber / secondNumber).toString();

        //First test with prototype build and sum operation
        test.only('Prototype build sum operation - cheking if answer is provided correctly', async () => {
            //Build selected to prototype
            await page.selectOption("#selectBuild", '0');
            //Clicks on First number field
            await page.click('#number1Field');
             //Fills First number field
            page.fill('#number1Field', convertToString1);
            //Clicks on Second number field
            await page.click('#number2Field');
            //Fills Second number field
            page.fill('#number2Field', convertToString2);
            //Clicks on Operation dropdown
            await page.click('#selectOperationDropdown');
            //Selects 'Add' Operation
            await page.selectOption('#selectOperationDropdown', '0');
            //Click on Calculate button 
            await page.click('input:has-text("Calculate")');

            //Checking answer field
            const fieldAnswer = await page.inputValue("#numberAnswerField");
            //Is answer field comes as expected
            expect(fieldAnswer).toBe(sum);
        });

        test.only('First build subtract operation - cheking if answer is provided correctly', async () => {
            await page.selectOption("#selectBuild", '1');
            await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
            await page.click('#selectOperationDropdown'); 
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('input:has-text("Calculate")');

            const fieldAnswer = await page.inputValue("#numberAnswerField");
            expect(fieldAnswer).toBe(subtract);

        });

        test.only('Second build mutiply operation - cheking if answer is provided correctly', async () => {
            await page.selectOption("#selectBuild", '2');
            await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
            await page.click('#selectOperationDropdown');
            await page.selectOption('#selectOperationDropdown', '2');
            await page.click('input:has-text("Calculate")');

            const fieldAnswer = await page.inputValue("#numberAnswerField");
            expect(fieldAnswer).toBe(multiply);

        });

        test.only('Third build divide operation - cheking if answer is provided correctly', async () => {
            await page.selectOption("#selectBuild", '3');
            await page.click('#number1Field');
            page.fill('#number1Field', convertToString1);
            await page.click('#number2Field');
            page.fill('#number2Field', convertToString2);
            await page.click('#selectOperationDropdown');
            await page.selectOption('#selectOperationDropdown', '3');
            await page.click('input:has-text("Calculate")');

            const fieldAnswer = await page.inputValue("#numberAnswerField");
            expect(fieldAnswer).toBe(divide);
        });
});