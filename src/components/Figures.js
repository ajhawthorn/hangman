import React from "react";

const Figures = ({ hangmanState, correctWord }) => {
  // Arrah of hangman images
  const hangmanImages = [
    "state1.GIF",
    "state2.GIF",
    "state3.GIF",
    "state4.GIF",
    "state5.GIF",
    "state6.GIF",
    "state7.GIF",
    "state8.GIF",
    "state9.GIF",
    "state10.GIF",
    "state11.GIF",
  ];

  if (hangmanState >= hangmanImages.length) {
    // Game over, display a message and the correct word

    return (
      <div>
        <p>Sorry, game over.</p>
        <p>The correct word was: {correctWord}</p>
        <img
          src={`images/hangmandrawings/${
            hangmanImages[hangmanImages.length - 1]
          }`}
          alt={`Hangman State ${hangmanImages.length - 1}`}
        />
      </div>
    );
  }

  if (hangmanState > 0) {
    return (
      <div>
        <img
          src={`images/hangmandrawings/${hangmanImages[hangmanState]}`}
          alt={`Hangman State ${hangmanState}`}
        />
      </div>
    );
  }

  return null;
};
export default Figures;
