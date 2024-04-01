import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./startScreen";
import Question from "./Question.js";
const initialState = {
  question: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReciver":
      return {
        ...state,
        question: action.payLoad,
        status: "ready",
      };
    case "dataFaild":
      return {
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
      case "newAnswer":
      return{
        ...state,

        answer: action.payLoad
      }
    default:
      throw new Error("Action is unkonwn");
  }
}
export default function App() {
  const [{ question, status, index,answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionLength = question.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReciver", payLoad: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionLength={questionLength} dispatch={dispatch} />
        )}
        {status === "active" && <Question answer={answer} dispatch={dispatch} question={question[index]} />}
      </Main>
    </div>
  );
}
