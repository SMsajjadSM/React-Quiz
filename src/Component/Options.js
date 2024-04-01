export default function Options({ question, dispatch, answer }) {
  console.log(question);
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
          className={`btn btn-option ${
            index === answer ? "answer" : ""} ${index === question.correctOption ? "correct " : "wrong"}`  }
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
