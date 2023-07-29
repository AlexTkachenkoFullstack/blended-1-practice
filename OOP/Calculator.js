class Calculator {
  constructor(operator, numbers) {
    this.operator = operator;
    this.numbers = numbers;
  }
  calculation = (operator, numbers) => {
    switch (operator) {
      case "sum":
        return numbers.reduce((acc, item) => acc + item);
      case "sub":
        return numbers.reduce((acc, item) => acc - item);
      case "mult":
        return numbers.reduce((acc, item) => acc * item);
      case "div":
        return numbers.reduce((acc, item) => acc / item);
      default:
        return "Unknown operation type";
    }
  };

  init = () => {
    return this.calculation(this.operator, this.numbers);
  };
}
const [operator, ...arguments] = process.argv.slice(2);
const numbers = arguments.map((item) => Number(item));
module.exports = new Calculator(operator, numbers);
