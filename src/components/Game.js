import React, { useState } from "react";
import { dailyPhoto } from "../data/dailyPhoto";

const Game = () => {
  const [guess, setGuess] = useState(""); // User's current guess
  const [feedback, setFeedback] = useState(null); // Feedback message
  const [showHint, setShowHint] = useState(false); // Hint visibility
  const [attemptsLeft, setAttemptsLeft] = useState(3); // Number of remaining attempts
  const [gameOver, setGameOver] = useState(false); // Game over status

  const handleGuess = () => {
    if (gameOver) return;

    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setFeedback("❌ Please enter a valid year.");
      return;
    }

    const difference = Math.abs(userGuess - dailyPhoto.correctYear);

    if (userGuess === dailyPhoto.correctYear) {
      setFeedback("🎉 Correct! The year is " + dailyPhoto.correctYear + "!");
      setGameOver(true); // End the game if the guess is correct
    } else {
      setAttemptsLeft(attemptsLeft - 1); // Decrease attempts
      if (attemptsLeft - 1 > 0) {
        setFeedback(
          `❌ Incorrect. ${attemptsLeft - 1} ${
            attemptsLeft - 1 === 1 ? "attempt" : "attempts"
          } remaining. Try Again!`
        );
      } else {
        setFeedback(
          `❌ Game Over! The correct year was ${dailyPhoto.correctYear}.`
        );
        setGameOver(true); // End the game when attempts are exhausted
      }
    }

    setGuess(""); // Clear the input field after each guess
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Guess the Year</h2>
      <img
        src={dailyPhoto.photoURL}
        alt="Daily Challenge"
        style={{ maxWidth: "80%", marginBottom: "20px" }}
      />
      <div>
        <input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver} // Disable input if the game is over
          style={{ padding: "10px", fontSize: "16px", width: "200px" }}
        />
        <button
          onClick={handleGuess}
          disabled={gameOver} // Disable button if the game is over
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            backgroundColor: gameOver ? "gray" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: gameOver ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>
      </div>
      <button
        onClick={() => setShowHint(!showHint)}
        style={{
          marginTop: "10px",
          padding: "8px 15px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>
      {showHint && (
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>{dailyPhoto.hint}</p>
      )}
      {feedback && (
        <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
          {feedback}
        </p>
      )}
      {gameOver && (
        <button
          onClick={() => window.location.reload()} // Reload the page to restart the game
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Game;