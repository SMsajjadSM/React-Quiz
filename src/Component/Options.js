export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct "
                : "wrong"
              : ""
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
