export default function NextBtn({ dispatch, answer, index, questionLength }) {
  if (answer === null) return;
  if (index < questionLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );
    if(index === questionLength -1)return <button   className="btn btn-ui"
    onClick={() => dispatch({ type: "finish" })}
  >
    Finish

    </button>
}
