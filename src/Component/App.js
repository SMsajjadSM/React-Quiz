import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./startScreen";
import Question from "./Question.js";
import NextBtn from "./NextBtn.js";
import Progress from "./Progress";
import Finish from "./Finish.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
const initialState = {
  question: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  hightscore: 0,
  seconds: null,
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
        seconds: state.question.length * 20,
      };
    case "newAnswer":
      const question = state.question.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        hightscore:
          state.points > state.hightscore ? state.points : state.hightscore,
      };
    case "restart":
      return {
        ...initialState,
        question: state.question,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action is unkonwn");
  }
}
export default function App() {
  const [
    { question, status, index, answer, points, hightscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const allPoints = question.reduce((prev, cur) => prev + cur.points, 0);
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
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              allPoints={allPoints}
              points={points}
              questionLength={questionLength}
              index={index}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              question={question[index]}
            />
            <Footer>
              <Timer seconds={seconds} dispatch={dispatch} />
              <NextBtn
                index={index}
                questionLength={questionLength}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            hightscore={hightscore}
            point={points}
            allPoints={allPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
