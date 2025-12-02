import React, { useState, useEffect } from "react";

const Sample_Test_1 = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);

  const handleInput = (value) => {
    setError("");
    if (value === "C") return clearInput();
    if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
      setResult("");
      return;
    }
    if (value === "=") return calculate();
    if (!input && isOperator(value) && value !== "-") return;
    if (input && isOperator(input[input.length - 1]) && isOperator(value)) {
      setInput((prev) => prev.slice(0, -1) + value);
      return;
    }
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
    setError("");
  };

  const calculate = () => {
    if (!input) return;
    try {
      const safeExpression = input.replace(/[^0-9+\-*/().%]/g, "");
      const calculatedValue = eval(safeExpression);
      if (calculatedValue === undefined) {
        setError("Invalid expression");
        setResult("");
      } else {
        setResult(calculatedValue);
        setError("");
      }
    } catch {
      setError("Invalid expression");
      setResult("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "(", ")", "%"].includes(key)
      ) {
        e.preventDefault();
        handleInput(key);
      } else if (key === "Enter") {
        e.preventDefault();
        handleInput("=");
      } else if (key === "Backspace") {
        e.preventDefault();
        handleInput("DEL");
      } else if (key === "Escape") {
        e.preventDefault();
        handleInput("C");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const buttons = [
    "C",
    "(",
    ")",
    "DEL",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "%",
    "+",
    "=",
  ];

  const baseBtn =
    "py-3 rounded-xl text-lg font-semibold transition transform active:scale-95 shadow-sm border border-slate-700";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 px-4 select-none">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] p-5 backdrop-blur-xl">
        
        <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-xl font-bold tracking-wide text-gray-200">
            Advanced BODMAS Tool
          </h2>
        </div>

        <div className="mb-4">
          <div className="w-full min-h-[80px] bg-black/40 border border-gray-700 rounded-xl px-4 py-3 flex flex-col justify-center items-end overflow-x-auto shadow-inner">
            <div className="text-sm text-gray-400 w-full text-right break-words tracking-wide">
              {input || "Start typing..."}
            </div>
            <div className="text-3xl font-bold mt-1 text-emerald-400 drop-shadow-lg">
              {error ? "Error" : result || "0"}
            </div>
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-400 text-right">{error}</p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-3">
          {buttons.map((btn) => {
            const isOperatorBtn =
              isOperator(btn) || ["(", ")", "%"].includes(btn);
            const isEqualBtn = btn === "=";
            const isClear = btn === "C";
            const isDel = btn === "DEL";

            let extraClasses = "bg-gray-800 hover:bg-gray-700";
            if (isOperatorBtn)
              extraClasses =
                "bg-gray-700 hover:bg-gray-600 text-amber-300 border-amber-300/20";
            if (isClear)
              extraClasses =
                "bg-red-600 hover:bg-red-700 text-white font-semibold";
            if (isDel)
              extraClasses =
                "bg-orange-500 hover:bg-orange-600 text-white text-base";
            if (isEqualBtn)
              extraClasses =
                "bg-emerald-600 hover:bg-emerald-700 text-white col-span-2 text-xl font-bold";

            return (
              <button
                key={btn}
                onClick={() => handleInput(btn)}
                className={`${baseBtn} ${extraClasses}`}
              >
                {btn === "DEL" ? "⌫" : btn}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-[11px] text-gray-500 text-center border-t border-gray-700 pt-3 tracking-wide">
          Keyboard Supported — Use numbers, operators, Enter, Backspace, Esc.
        </div>
      </div>
    </div>
  );
};

export default Sample_Test_1;
