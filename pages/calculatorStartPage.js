exports.CalculatorStartPage = class CalculatorStartPage {
    constructor(page) {
        this.page = page;}

    async goto() {
    await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
    }

    async initiateFill() {
        await this.page.fill('#number1Field', convertToString1);
        await this.page.fill('#number1Field', convertToString2);
        }
}