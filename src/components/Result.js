import React from "react";
import Button from "react-bootstrap/Button";

const Result = ({ isWin, selectedWord, handleRestart }) => {
  return (
    <div>
      {isWin ? (
        <div>
          <p>Winner! Congratulations!</p>
          <p>The correct word was: {selectedWord}</p>
        </div>
      ) : (
        <div>
          <p>Sorry, game over</p>
          <p>The correct word was: {selectedWord}</p>
        </div>
      )}
      <Button variant="dark" onClick={handleRestart}>
        Restart
      </Button>
    </div>
  );
};

export default Result;
