/**
 * Created by richard.lovell on 26/07/2016.
 * A simple calculator using vanilla javascript.
 */
"use strict";

(function() {

  //*****************model********************//

  //calculator class
  var Calculator = function() {
    this.memory = '';
    this.current = '';
    this.total = '';
    this.operator = '';
    this.calcReady = false;
    

    /*
    * Set a digit for display on the screen.
    */
    this.setDigit = function(digit) {
      //take away leading zero, if one exists
      function trim(value){
        if(value === '0'){
          return '';
        }
        return value;
      }
      if (!this.operator) {
        this.memory = trim(this.memory);
        //concatenate the numbers together (i.e. 1 + 2 = 12)
        this.memory += digit;
        this.calcReady = false;
        return this.memory;
      } else {
        this.current = trim(this.current);
        //concatenate the numbers together (i.e. 1 + 2 = 12)
        this.current += digit;
        this.calcReady = true;
        return this.current;
      }
      
    };
    
    this.setOperator = function(operator) {
        //if operator is already set and no other operator has already been set, 
        //make calculation
      if (this.calcReady && this.operator) {
        return this.calculate();
      }
      this.operator = operator;
      
    };

    this.calculate = function() {
      switch (this.operator) {
        case '+':
          this.total = parseFloat(this.memory) + parseFloat(this.current);
          break;
        case '-':
          this.total = parseFloat(this.memory) - parseFloat(this.current) ;
          break;
        case '*':
          this.total = parseFloat(this.current) * parseFloat(this.memory);
          break;
        case '/':
          this.total = parseFloat(this.memory) / parseFloat(this.current);
          break;
        default:
          return false;
      }
      this.clear(false);
      this.memory = this.total;
      return this.total;
    };
    
    /*
    * Toggle the sign on the current value (i.e. 10 or -10).
    */
    this.toggleSign = function() {
      if (!this.operator) {
        this.memory = this.memory * -1;
        return this.memory;
      }else{
        this.current = this.current * -1;
        return this.current;
      }
    };
    
   /*
   * Remove the last entered digit.
   * Returns the current value minus the last entered digit, or zero if only one digit exists.
   */
    this.undo = function() {
      if (this.operator) {
        if(this.current.length === 1){
          this.current = '0';
        }else{
          this.current = this.current.substring(0,this.current.length - 1);
        }
        return this.current.toString();
      }else{
        if(this.memory.length === 1){
          this.memory = '0';
        }else{
          this.memory = this.memory.substring(0,this.memory.length - 1);
        }
        return this.memory.toString();
      }
       return null;
    };

    this.clear = function(resetMemory) {
      if(resetMemory){
        this.memory = '';
        this.total = '';
        this.operator = '';
      }
      this.current = '';
      this.calcReady = false;
      return '0';
    };
    
    this.getTotal = function() {
      var total = this.calculate();
      this.memory = total;
      this.current = '';
      this.operator = '';
      return total;
    };

    /*
    * Run app (wire up the view and the model).
    */
    this.run = function() {
      
      function display(value){
        if(value){
          //show the value on the screen
          document.querySelector('.calc__screen').value = value;
        }
      }
      
      function initDigits() {
        //add click event listeners to the digit buttons to set the digit and display the result
        var digitBtns = document.querySelectorAll('.digit');
        for (var i = 0; i < digitBtns.length; i++) {
          digitBtns[i].addEventListener('click', function(evt) {
            display(calculator.setDigit(evt.target.value));
          });
        }
      }
      
      function initOperators() {
        //add click event listeners to the operator buttons to set the operator and display the result
        var operatorBtns = document.querySelectorAll('.operator');
        for (var i = 0; i < operatorBtns.length; i++) {
          operatorBtns[i].addEventListener('click', function(evt) {
            display(calculator.setOperator(evt.target.value));
          });
        }
      };
      
      function initEquals() {
        //add a click event listener to the equal button to display the total
        document.querySelector('.equals-btn').addEventListener('click', function() {
            display(calculator.getTotal());
            this.memory = this.total;
          });
      };
      
      function initClear() {
        //add a click event listener to the clear button to display the cleared value (and reset the memory)
        document.querySelector('.clear-btn').addEventListener('click', function() {
            display(calculator.clear(true));
          });
      };
      
      function initBackspace() {
        //add a click event listener to the backspace button undo the last entered digit
        document.querySelector('#backspace-btn').addEventListener('click', function() {
            display(calculator.undo());
          });
      };
      
      function initToggleSign() {
        //add a click event listener to the sign button to toggle the sign
        document.querySelector('#sign-btn').addEventListener('click', function() {
            display(calculator.toggleSign());
          });
      };
      initDigits();
      initOperators();
      initEquals();
      initClear();
      initBackspace();
      initToggleSign();
    };
  };

  //*****************controller********************//
  
  //create calculator
  var calculator = new Calculator();
  calculator.run();
  
    //********tests (see browser console)******//

  /*
   * Helper function to display test results.
   */
  var runTest = function(calculator, input) {
    console.log('Testing.... Input: ' + input + '. Current total: ' + calculator.total);
  };

  //-------multiply
  var digit1 = '5';
  var digit2 = '3';
  var operator = '*';

  //input '5'
  calculator.setDigit(digit1);
  runTest(calculator, digit1);

  //input '*'
  calculator.setOperator(operator);
  runTest(calculator, operator);

  //input '3'
  calculator.setDigit(digit2);
  runTest(calculator, digit2);

  //input '-' to instigate calculation (5 * 3 = 15)
  calculator.setOperator(operator);
  runTest(calculator, operator);

  calculator.clear(true);

  //-------divide
  digit1 = '5';
  digit2 = '3';
  operator = '/';

  //input '5'
  calculator.setDigit(digit1);
  runTest(calculator, digit1);

  //input '/'
  calculator.setOperator(operator);
  runTest(calculator, operator);

  //input '3'
  calculator.setDigit(digit2);
  runTest(calculator, digit2);

  //input '-' to instigate calculation (5 / 3 = 1.66667)
  calculator.setOperator(operator);
  runTest(calculator, operator);

  calculator.clear(true);

  //-------add
  digit1 = '5';
  digit2 = '3';
  operator = '+';

  //input '5'
  calculator.setDigit(digit1);
  runTest(calculator, digit1);

  //input '+'
  calculator.setOperator(operator);
  runTest(calculator, operator);

  //input '3'
  calculator.setDigit(digit2);
  runTest(calculator, digit2);

  //input '-' to instigate calculation (5 + 3 = 8)
  calculator.setOperator(operator);
  runTest(calculator, operator);

  calculator.clear(true);

  //-------minus
  digit1 = '5';
  digit2 = '3';
  operator = '-';

  //input '5'
  calculator.setDigit(digit1);
  runTest(calculator, digit1);

  //input '-'
  calculator.setOperator(operator);
  runTest(calculator, operator);

  //input '3'
  calculator.setDigit(digit2);
  runTest(calculator, digit2);

  //input '-' to instigate calculation (5 - 3 = 2)
  calculator.setOperator(operator);
  runTest(calculator, operator);

  calculator.clear(true);

  //-------multi-digit
  digit1 = '5';
  digit2 = '3';
  var digit3 = '1';
  var digit4 = '4';
  var digit5 = '7';
  operator = '-';

  //input '5'
  calculator.setDigit(digit1);
  runTest(calculator, digit1);

  //input '3' (5 + 3 = 53)
  calculator.setDigit(digit2);
  runTest(calculator, digit2);

  //input '1'  (53 + 1 = 531)
  calculator.setDigit(digit3);
  runTest(calculator, digit3);

  //input '-'
  calculator.setOperator(operator);
  runTest(calculator, operator);

  //input '4'  
  calculator.setDigit(digit4);
  runTest(calculator, digit4);

  //input '7'  (4 + 7 = 47)
  calculator.setDigit(digit5);
  runTest(calculator, digit5);

  //input '-' to instigate calculation (531 - 47 = 484)
  calculator.setOperator(operator);
  runTest(calculator, operator);

  calculator.clear(true);

})(document); //pass DOM document into scope