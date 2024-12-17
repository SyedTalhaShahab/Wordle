import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const firstKeys = keys1;
  const secondkeys = keys2;
  const thirdkeys = keys3;

  const {
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver === true)
        return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        firstKeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        secondkeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        thirdkeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currAttempt]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  console.log(disabledLetters);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {firstKeys.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>
      <div className="line2">
        {secondkeys.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {thirdkeys.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
