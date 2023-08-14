import React, { useState, useEffect, useCallback } from "react";
import Figures from "./Figures";
import WrongLetters from "./WrongLetters";
import Button from "react-bootstrap/Button";
import Result from "./Result";
import { Container, Row, Col } from "react-bootstrap";

// answer will need the selectedWord and correctLetters
const Answer = () => {
  // State to hold selected random word and guessed letters
  const [selectedWord, setSelectedWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [hangmanState, setHangmanState] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  // Function to fetch random word from dictionary.txt

  const fetchWord = async () => {
    try {
      const response = await fetch("/dictionary.txt");
      const text = await response.text();
      const lines = text.split("\n");
      const startIndex = lines.indexOf("START") + 1;
      const wordList = lines.slice(startIndex);

      if (wordList.length === 0) {
        console.log("Word list is empty or not available.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * wordList.length);
      const randomWord = wordList[randomIndex].trim().toLowerCase();
      setSelectedWord(randomWord);
    } catch (error) {
      console.log("Error fetching word:", error);
    }
  };

  // Function to handle game over
  const handleGameOver = useCallback(() => {
    setGameOver(true);
  }, []);

  // Function to handle game restart
  const handleRestart = () => {
    // reset to intial values
    setSelectedWord("");
    setGuessedLetters([]);
    setWrongLetters([]);
    setHangmanState(0);
    setGameOver(false);
    setIsWin(false);

    // Fetch a new random word
    fetchWord();
  };

  // Function to handle guesses
  const handleGuess = useCallback(
    (letter) => {
      const formattedLetter = letter.toLowerCase();
      if (
        guessedLetters.includes(formattedLetter) ||
        wrongLetters.includes(formattedLetter)
      ) {
        // Ignore guess if letter already guessed
        return;
      }

      if (selectedWord.includes(formattedLetter)) {
        // correct guess
        setGuessedLetters([...guessedLetters, formattedLetter]);
      } else {
        // incorrect guess
        setWrongLetters([...wrongLetters, formattedLetter]);

        // update hangman state to show next picture
        setHangmanState((prev) => Math.min(prev + 1, 11));

        // check if game is over
        if (hangmanState === 11) {
          handleGameOver();
        }
      }
    },
    [guessedLetters, wrongLetters, selectedWord, hangmanState, handleGameOver]
  );

  // Function to display underscore for each letter in the word
  const getDisplayWord = () => {
    return selectedWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  // Event listener for keyboard input

  const handleKeyDown = useCallback(
    (event) => {
      // Check if the pressed key is a letter
      if (/^[a-zA-Z]$/.test(event.key)) {
        // Call the handleGuess function with pressed letter
        handleGuess(event.key);
      }
    },
    [handleGuess]
  );

  // Function to check if the game is over
  const isGameOver = () => {
    return hangmanState >= 11;
  };

  // Function to check if the user has won
  const checkWin = useCallback(() => {
    const lettersInWord = new Set(selectedWord.split(""));
    const guessedSet = new Set(guessedLetters);
    if (
      guessedLetters.length === lettersInWord.size &&
      [...lettersInWord].every((letter) => guessedSet.has(letter))
    ) {
      setIsWin(true);
    }
  }, [selectedWord, guessedLetters]);

  // Event listener for keyboard input
  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  //Effect hook to fetch the random word when the component mounts
  useEffect(() => {
    fetchWord();
  }, []);

  // Check if user has won when guessedLetters state changes

  useEffect(() => {
    if (guessedLetters.length > 0) {
      checkWin();
    }
  }, [guessedLetters, checkWin]);

  return (
    <div>
      {isGameOver() || isWin ? (
        <Result
          key="result"
          isWin={isWin}
          selectedWord={selectedWord}
          handleRestart={handleRestart}
        />
      ) : (
        <>
          <p key="displayWord">{getDisplayWord()}</p>
          <p key="wrongLettersHeader">Wrong Letters:</p>
          <WrongLetters
            key="wrongLettersComponent"
            wrongLetters={wrongLetters}
          />
          <Figures
            key="figuresComponent"
            hangmanState={hangmanState}
            correctWord={selectedWord}
          />
        </>
      )}
    </div>
  );
};

export default Answer;
