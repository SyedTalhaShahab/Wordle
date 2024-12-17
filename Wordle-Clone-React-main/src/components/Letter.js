import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
const boolean = true;

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord: the_correct_Word } =
    useContext(AppContext);

  const the_letter = board[attemptVal][letterPos];

  const correct = the_correct_Word.toUpperCase()[letterPos] === the_letter;

  const almost = !correct && the_letter !== "" && the_correct_Word.toUpperCase().includes(the_letter);

  const letter_state = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (the_letter !== "" && !correct && !almost && boolean) {
      console.log(the_letter);
      setDisabledLetters((prev) => [...prev, the_letter]);
    }
  }, [almost, correct, currAttempt.attempt, setDisabledLetters, the_letter]);
  return (
    <div className="letter" id={letter_state}>
      {the_letter}
    </div>
  );
}

export default Letter;
