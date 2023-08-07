import React from "react";

const WrongLetters = ({ wrongLetters }) => {
  return (
    <div>
      {wrongLetters?.map((letter, index) => (
        <span key={index} style={{ marginRight: "5px" }}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default WrongLetters;
