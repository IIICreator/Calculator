import { Component, NgModuleFactoryLoader } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  public currentValue: number = 0;
  public finalValue: number = 0;

  public calculatorExpression: string = "";
  public calculationResult: string = "0";

  public onHandleButtonClick(event: any): void {
    console.log(event.target.innerText);

    var lastSymbol = this.getCalculatorExpressionLastSymbol();
    var clickedButtonSymbol = event.target.innerText;

    if (clickedButtonSymbol == "=") {
      this.calculateCalculatorExpression();

    } else if (clickedButtonSymbol == "C") {
      this.clearCalculatorExpression();

    } else {
      var addSymbol = false;
      if (this.calculatorExpression == "" && Number.isInteger(Number(clickedButtonSymbol))) {
        addSymbol = true;
      }
      if (Number.isInteger(Number(lastSymbol))) {
        addSymbol = true;
      }
      if (this.calculatorExpression != "" && !Number.isInteger(Number(lastSymbol)) && Number.isInteger(Number(clickedButtonSymbol))) {
        addSymbol = true;
      }

      if(addSymbol){
        this.addSymbolToCalculatorExpression(event.target.innerText);
      }

    }

  }

  public getCalculatorExpressionLastSymbol(): string {
    var lastChar = this.calculatorExpression[this.calculatorExpression.length - 1];
    return lastChar;
  }

  public addSymbolToCalculatorExpression(clickedButtonSymbol: string): void {
    this.calculatorExpression += clickedButtonSymbol;
  }

  public setCalculatorExpression(valueToSet: string): void {
    this.calculatorExpression = valueToSet;
  }

  public setCalculationResult(valueToSet: string) {
    this.calculationResult = valueToSet;
  }

  public calculateCalculatorExpression(): void {
    let currentSum = 0;
    var calculatorExpressionLength = this.calculatorExpression.length;
    if (calculatorExpressionLength >= 3) {
      
      var calculatorExpressionCopy = this.calculatorExpression;

      let currentIndex = 0;
      let currentResult = 0;
      let counter = 0;
      
      let previousOperation = "";
      while(counter < 5){
        //Find index of symbol
        debugger;

        counter++;

        var index = this.findOperationIndex(calculatorExpressionCopy);
        var number;
        if(index == -1){
          number = calculatorExpressionCopy.substring(0, calculatorExpressionCopy.length);

          counter = 5;
        } else {
          number = calculatorExpressionCopy.substring(0, index);
        }
        var operation = calculatorExpressionCopy.substring(index, index + 1);

        if(counter == 1){
          currentSum = Number(number);
          previousOperation = operation;
        } else {
          //currentSum += Number(number);
          currentSum = this.performOperation(currentSum.toString(), number, previousOperation);
          previousOperation = operation;
        }

        console.log(previousOperation);
        console.log(currentSum);

        calculatorExpressionCopy = calculatorExpressionCopy.substring(index + 1, calculatorExpressionCopy.length);

        
        /*
        var partOfExpression = this.findPartOfExpression(calculatorExpressionCopy);
        var partOfExpressionLength = partOfExpression[0].length;
        
        var operationIndex = this.findOperationIndex(partOfExpression[0].toString());
        var operation = calculatorExpressionCopy.substring(operationIndex, operationIndex + 1);

        var firstArgument = calculatorExpressionCopy.substring(0, operationIndex);
        var secondArgument = calculatorExpressionCopy.substring(operationIndex + 1, calculatorExpressionCopy.length);

        //TODO Function for calculation of the two arguments!
        var currentSum = Number(firstArgument) + Number(secondArgument);

        calculatorExpressionCopy = calculatorExpressionCopy.substring(partOfExpressionLength, calculatorExpressionCopy.length);
        counter++;
        */
        
      }
    }

    this.setCalculationResult(currentSum.toString());
  }

  public performOperation(numberOne: string, numberTwo: string, operation: string) {
    switch (operation) {
      case '*':
        return Number(numberOne) * Number(numberTwo);
        break;
      case '/':
        return Number(numberOne) / Number(numberTwo);
        break;
      case '-':
        return Number(numberOne) - Number(numberTwo);
        break;
      case '+':
          return Number(numberOne) + Number(numberTwo);
        break;
      default:
          return 0;
    }

  }

  public findOperationIndex(expression: string) {
    var index = expression.search(/\-|\+|\*|\//);
    return index;
  }

  public findPartOfExpression(expression: string) {
    var expressionPart = expression.match(/\d+[\-|\+|\*|\\/]\d+/);
    if(expressionPart == null){
      return "";
    } else {
      return expressionPart;
    }
  }

  public clearCalculatorExpression(): void {
    this.setCalculatorExpression("");
  }






}
