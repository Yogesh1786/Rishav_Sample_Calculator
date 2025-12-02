import React, { useState, useEffect } from "react";

const Sample_Test_1 = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);

  const handleInput = (value) => {
    setError("");

    // Clear
    if (value === "C") {
      clearInput();
      return;
    }

    // Backspace
    if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
      setResult("");
      return;
    }

    // Calculate
    if (value === "=") {
      calculate();
      return;
    }

    // Avoid starting with an operator (except minus)
    if (!input && isOperator(value) && value !== "-") return;

    // Avoid double operators like ++, +*, etc.
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
      // BODMAS is handled by JS evaluation order
      // Only allow safe characters
      const safeExpression = input.replace(/[^0-9+\-*/().%]/g, "");

      // eslint-disable-next-line no-eval
      const calculatedValue = eval(safeExpression);

      if (calculatedValue === undefined) {
        setError("Invalid expression");
        setResult("");
      } else {
        setResult(calculatedValue);
        setError("");
      }
    } catch (err) {
      setError("Invalid expression");
      setResult("");
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (
        (key >= "0" && key <= "9") ||
        ["+", "-", "*", "/", ".", "(", ")","%"].includes(key)
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
    "py-3 rounded-lg text-lg font-semibold transition transform active:scale-95 shadow-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 px-4">
      <div className="w-full max-w-sm bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl p-5 backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">BODMAS Calculator</h2>
            <p className="text-xs text-slate-400">
              Supports brackets and follows operator precedence.
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40">
            BODMAS
          </span>
        </div>

        {/* Display */}
        <div className="mb-3">
          <div className="w-full min-h-[70px] bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 flex flex-col justify-center items-end overflow-x-auto">
            <div className="text-xs text-slate-400 w-full text-right break-words">
              {input || "Enter expression..."}
            </div>
            <div className="text-2xl font-bold mt-1 text-emerald-300">
              {error ? "Error" : result || "0"}
            </div>
          </div>
          {error && (
            <p className="mt-1 text-xs text-red-400 text-right">{error}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {buttons.map((btn) => {
            const isOperatorBtn = isOperator(btn) || ["(", ")", "%"].includes(btn);
            const isEqualBtn = btn === "=";
            const isClear = btn === "C";
            const isDel = btn === "DEL";

            let extraClasses = "bg-slate-800 hover:bg-slate-700";
            if (isOperatorBtn)
              extraClasses = "bg-slate-700 hover:bg-slate-600 text-amber-300";
            if (isClear)
              extraClasses =
                "bg-red-500/90 hover:bg-red-500 text-white col-span-1";
            if (isDel)
              extraClasses =
                "bg-orange-500/90 hover:bg-orange-500 text-white text-base";
            if (isEqualBtn)
              extraClasses =
                "bg-emerald-500 hover:bg-emerald-600 text-white col-span-2";

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

        {/* Hint */}
        <div className="mt-4 text-[11px] text-slate-400 text-center">
          Tip: You can also use your keyboard (0–9, + − × ÷, Enter, Backspace, Esc).
        </div>
      </div>
    </div>
  );
};

export default Sample_Test_1;
