import React from "react";
import Button from "react-bootstrap/Button";

const Help = () => {
  const handleHelpClick = () => {
    const gameRules =
      "Type a letter on the keyboard to guess a letter in the word. \nFor every wrong guess, an element of the hangman will appear. \nCan you guess the word before the hangman appears?";
    alert(gameRules);
  };
  return (
    <Button variant="dark" onClick={handleHelpClick}>
      Help
    </Button>
  );
};

export default Help;
