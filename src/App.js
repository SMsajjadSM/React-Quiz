import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./startScreen";
const initialState = {
  question: [],
  status: "loading",
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

    default:
      throw new Error("Action is unkonwn");
  }
}
export default function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, initialState);
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
        {status === "ready" && <StartScreen questionLength={questionLength} />}
      </Main>
    </div>
  );
}
