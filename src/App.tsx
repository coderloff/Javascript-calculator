import { useEffect, useState } from "react";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import Formula from "./components/Formula";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleSubmit = () => {
    console.log(calculatorData);

    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  console.log(output);

  const handleNumbers = (value: any) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value: any) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleInput = (value: any) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <div className="output">
          <Formula formula={output} />
          <Display input={input} />
        </div>
        <span className="bar"></span>
        <Keyboard data={calcData} handleInput={handleInput} />
      </div>
      <div className="attribute">
        <h2>by Coderloff</h2>
      </div>
    </div>
  );
};

export default App;