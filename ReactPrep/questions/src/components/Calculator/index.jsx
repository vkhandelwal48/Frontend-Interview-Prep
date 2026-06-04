
import React, { useState } from 'react';
import './styles.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };

  const handleToggleSign = () => {
    const current = parseFloat(display);
    setDisplay(String(current * -1));
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="btn btn-function" onClick={handleClear}>AC</button>
        <button className="btn btn-function" onClick={handleToggleSign}>+/-</button>
        <button className="btn btn-function" onClick={handlePercentage}>%</button>
        <button className="btn btn-operator" onClick={() => handleOperation('/')}>/</button>

        <button className="btn" onClick={() => handleNumber(7)}>7</button>
        <button className="btn" onClick={() => handleNumber(8)}>8</button>
        <button className="btn" onClick={() => handleNumber(9)}>9</button>
        <button className="btn btn-operator" onClick={() => handleOperation('*')}>*</button>

        <button className="btn" onClick={() => handleNumber(4)}>4</button>
        <button className="btn" onClick={() => handleNumber(5)}>5</button>
        <button className="btn" onClick={() => handleNumber(6)}>6</button>
        <button className="btn btn-operator" onClick={() => handleOperation('-')}>-</button>

        <button className="btn" onClick={() => handleNumber(1)}>1</button>
        <button className="btn" onClick={() => handleNumber(2)}>2</button>
        <button className="btn" onClick={() => handleNumber(3)}>3</button>
        <button className="btn btn-operator" onClick={() => handleOperation('+')}>+</button>

        <button className="btn btn-zero" onClick={() => handleNumber(0)}>0</button>
        <button className="btn" onClick={handleDecimal}>.</button>
        <button className="btn btn-equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
