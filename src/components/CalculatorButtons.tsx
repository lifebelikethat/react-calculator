import { useEffect, useReducer, useRef, useState } from 'react';
import './CalculatorButtons.css'

export default function Calculator() {
  const [input, setInput] = useState<string>('0');
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const buttons = [
    'AC', '%', '/', 'back',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '+/-', '.', '=',
  ]

  const opArray = ['+', '-', '*', '/', '%']

  function handleClick(event: React.MouseEvent<HTMLButtonElement>, value: string) {
    setInput(prevVal => {
      let lastChar = prevVal.charAt(prevVal.length-1);

      if (prevVal.length === 1 && prevVal.charAt(0) === '0' && !opArray.includes(value)) {
        return value;
      } else if (opArray.includes(lastChar) && opArray.includes(value)) {
        return prevVal.substring(0, prevVal.length-1) + value;
      } else if (input === 'NaN') {
        return value;
      } 
      else {
        return prevVal + value;
      }
    });

    if (value === '=') {
      setInput(prevVal => {
        let lastChar = input.charAt(input.length-1)
        if (opArray.includes(lastChar)) {
          return eval(input.substring(0, input.length-1)).toString();
        } else return eval(input).toString();
      });
    } else if (value === 'AC') {
      setInput('0');
    } else if (value === '+/-') {
      setInput((Number(input) * -1).toString());
    } else if (value === 'back') {
      setInput((prevVal) => {
        if (prevVal.length >= 1) {
          if (input === '0') {
            return input;
          } else if (input.length === 1) {
            return '0';
          }
          return prevVal.substring(0, prevVal.length-5);
        } 
        else {
          return prevVal;
        }
      })
    }
  }

  useEffect(() => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current?.scrollHeight + 'px';
  }, [input])

  return (
    <>
      <div style={{ margin: 'auto', width: '30%' }}>
        <textarea rows={1} value={input} style={{ width: '100%', fontSize: '40px', justifyContent: 'flex-end' }} ref={inputRef} readOnly />
      </div>
      <div className='calculator'>
        {
          buttons.map((btn, index) => {
            return <button key={index} onClick={(event) => handleClick(event, btn)} className='calculator-item'>{btn}</button>
          })
        }
      </div>
    </>
  )
}
