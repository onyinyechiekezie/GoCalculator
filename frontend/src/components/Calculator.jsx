import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './calculator.module.css';


const Calculator = () => {

  const [expression, setExpression] = useState('');

  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if ((event.key >= '0' && event.key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
  //       setExpression((prev) => prev + event.key);
  //     } else if (event.key === 'Enter') {
  //       handleCalculate();
  //     } else if (event.key === 'Backspace') {
  //       setExpression((prev) => prev.slice(0, -1));
  //
  //     } else if (event.key.toLowerCase() === 'c') {
  //       handleClear();
  //     }
  //
  //   };


  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => window.removeEventListener('keydown', handleKeyDown);
  // }, []);

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };


  const handleClear = () => {
    setExpression('');
    setResult('');


    setError('');
  };


  const handleCalculate = async () => {


    try {
      const response = await axios.post('http://localhost:8080/api/calculate', {
        expression,

      });
      const resultValue = response.data.result;
      setResult(resultValue);
      setError('');
      // setHistory(prev => [`${expression} = ${resultValue}`, ...prev]);

    } catch (err) {
      setError('Invalid Expression');
      setResult('');
    }
  };

  const buttons = ['(', ')', 'C', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

  return (
    <div className={styles.calculator}>
        <div className={styles.header}>Luna</div>
      <div className={styles.display}>
        <div>{expression || '0'}</div>
        <div className={styles.result}>{result && `= ${result}`}</div>
      </div>

      {error && <div className={styles.error}>{error}</div>} '+', '0', '.', '='];



      {history.length > 0 && (
        <div className={styles.history}>
          <h3>History</h3>
          <ul>
            {history.map((item, index) => (

              <li key={index}>{item}</li>

            ))}
          </ul>
        </div>
      )}

      <div className={styles.buttons}>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'C') handleClear();

              else if (btn === '=') handleCalculate();
              else handleClick(btn);
            }}
            className={`${styles.button} ${btn === 'C' || btn === '=' ? styles.specialButton : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;




























// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './calculator.module.css';
//
// const Calculator = () => {
//     const [expression, setExpression] = useState('');
//     const [result, setResult] = useState('');
//     const [error, setError] = useState('');
//
//     const handleClick = (value) => {
//         setExpression((prev) => prev + value);
//     };
//
//     const handleClear = () => {
//         setExpression('');
//         setResult('');
//         setError('');
//     };
//
//     const handleCalculate = async () => {
//
//         const cleanedExpression = expression.replace(/\s+/g, '');
//         try {
//             const response = await axios.post('http://localhost:8080/api/calculate', {
//                 expression: cleanedExpression,
//             });
//             setResult(response.data.result);
//             setError('');
//         } catch (err) {
//             setError('Invalid Expression');
//             setResult('');
//         }
//     };
//
//     return (
//         <div className={styles.calculator}>
//             <div className={styles.display}>
//                 <div>{expression || '0'}</div>
//                 <div className={styles.result}>{result && `= ${result}`}</div>
//             </div>
//             {error && <div className={styles.error}>{error}</div>}
//
//             <div className={styles.buttons}>
//                 {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'C', '+'].map((btn) => (
//                     <button
//                         key={btn}
//                         onClick={() => (btn === 'C' ? handleClear() : handleClick(btn))}
//                         className={styles.button}
//                     >
//                         {btn}
//                     </button>
//                 ))}
//                 <button onClick={handleCalculate} className={`${styles.button} ${styles.equals}`}>
//                     =
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default Calculator;
