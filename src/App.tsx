import { useRef, useState } from 'react'
import Calculator from './components/CalculatorButtons';


function App() {
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return (
    <>
      <Calculator />
    </>
  )
}

export default App
