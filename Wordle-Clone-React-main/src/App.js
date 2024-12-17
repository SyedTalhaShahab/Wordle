import "./Style.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault as original_board, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(original_board);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({ game_over: false, guessedWord: false });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const handleWordCheck = (word) => wordSet.has(word.toLowerCase());

  const onEnter = () => {
    if (currentAttempt.letter !== 5) return;

    const currentWord = board[currentAttempt.attempt].join("");

    if (handleWordCheck(currentWord)) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letter: 0 });
    } else {
      window.alert("Word Not Found!");
      return;
    }

    if (currentWord === correctWord) {
      setGameOver({ game_over: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ game_over: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currentAttempt.letter === 0) return;

    const updatedBoard = [...board];
    updatedBoard[currentAttempt.attempt][currentAttempt.letter - 1] = "";

    setBoard(updatedBoard);
    setCurrentAttempt({ ...currentAttempt, letter: currentAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currentAttempt.letter > 4) return;

    const updatedBoard = [...board];
    updatedBoard[currentAttempt.attempt][currentAttempt.letter] = key;

    setBoard(updatedBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letter: currentAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          disabledLetters,
          setDisabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.game_over ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
