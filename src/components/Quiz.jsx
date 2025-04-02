import React, { useReducer, useState } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  {
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Swift"],
    answer: "JavaScript",
  },
];

const initialState = { score: 0, currentQuestion: 0, showResult: false };

function quizReducer(state, action) {
  switch (action.type) {
    case "ANSWER": {
      const isCorrect =
        action.payload === questions[state.currentQuestion].answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        showResult: state.currentQuestion + 1 === questions.length,
      };
    }
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

function QuizApp() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [selectedOption, setSelectedOption] = useState(null);

  if (state.showResult) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold">Quiz Completed!</h2>
        <p>
          Your Score: {state.score} / {questions.length}
        </p>
        <button
          onClick={() => dispatch({ type: "RESTART" })}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-4">
          {questions[state.currentQuestion].question}
        </h2>
        {questions[state.currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`block w-full p-2 my-1 rounded ${
              selectedOption === option ? "bg-gray-300" : "bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={() => dispatch({ type: "ANSWER", payload: selectedOption })}
          className="bg-green-500 text-white p-2 rounded mt-4"
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      </div>
    );
  }
}

export default QuizApp;
