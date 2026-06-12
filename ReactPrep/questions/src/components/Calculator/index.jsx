
import React, { useState } from 'react';
import './styles.css';

const Calculator = () => {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isNewNumber, setIsNewNumber] = useState(true);

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  const inputValue = (value) => {
    if (value === '.') {
      if (isNewNumber) {
        setCurrent('0.');
        setIsNewNumber(false);
        return;
      }
      if (!current.includes('.')) {
        setCurrent(current + '.');
      }
      return;
    }

    if (isNewNumber) {
      setCurrent(String(value));
      setIsNewNumber(false);
      return;
    }

    setCurrent(current === '0' ? String(value) : current + value);
  };

  const chooseOperator = (nextOperator) => {
    const number = parseFloat(current);

    if (previous === null) {
      setPrevious(number);
    } else if (operator) {
      const result = calculate(previous, number, operator);
      setCurrent(String(result));
      setPrevious(result);
    }

    setOperator(nextOperator);
    setIsNewNumber(true);
  };

  const onEquals = () => {
    if (previous === null || !operator) return;

    const result = calculate(previous, parseFloat(current), operator);
    setCurrent(String(result));
    setPrevious(null);
    setOperator(null);
    setIsNewNumber(true);
  };

  const onClear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setIsNewNumber(true);
  };

  const onPercent = () => {
    setCurrent(String(parseFloat(current) / 100));
    setIsNewNumber(true);
  };

  const onToggleSign = () => {
    setCurrent(String(parseFloat(current) * -1));
  };

  return (
    <div className="calculator">
      <div className="display">{current}</div>
      <div className="buttons">
        <button className="btn btn-function" onClick={onClear}>AC</button>
        <button className="btn btn-function" onClick={onToggleSign}>+/-</button>
        <button className="btn btn-function" onClick={onPercent}>%</button>
        <button className="btn btn-operator" onClick={() => chooseOperator('/')}>/</button>

        <button className="btn" onClick={() => inputValue(7)}>7</button>
        <button className="btn" onClick={() => inputValue(8)}>8</button>
        <button className="btn" onClick={() => inputValue(9)}>9</button>
        <button className="btn btn-operator" onClick={() => chooseOperator('*')}>*</button>

        <button className="btn" onClick={() => inputValue(4)}>4</button>
        <button className="btn" onClick={() => inputValue(5)}>5</button>
        <button className="btn" onClick={() => inputValue(6)}>6</button>
        <button className="btn btn-operator" onClick={() => chooseOperator('-')}>-</button>

        <button className="btn" onClick={() => inputValue(1)}>1</button>
        <button className="btn" onClick={() => inputValue(2)}>2</button>
        <button className="btn" onClick={() => inputValue(3)}>3</button>
        <button className="btn btn-operator" onClick={() => chooseOperator('+')}>+</button>

        <button className="btn btn-zero" onClick={() => inputValue(0)}>0</button>
        <button className="btn" onClick={() => inputValue('.')}>.</button>
        <button className="btn btn-equals" onClick={onEquals}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
