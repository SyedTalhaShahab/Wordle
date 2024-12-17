import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const {
    currAttempt,
    gameOver,
    correctWord,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h2>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h2>
      <h2>Correct Word: {correctWord}</h2>
      {gameOver.guessedWord && (
        <h2>You guessed in {currAttempt.attempt} attempts</h2>
      )}
    </div>
  );
}

export default GameOver;
