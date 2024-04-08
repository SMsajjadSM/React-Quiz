import { type } from "@testing-library/user-event/dist/type";

export default function Finish({ point, allPoints, hightscore, dispatch }) {
  const percent = Math.ceil((point / allPoints) * 100);
  let emoji;
  if (percent === 100) emoji = "🥇";
  if (100 <= percent && percent < 80) emoji = "🎉";
  if (80 <= percent && percent < 50) emoji = "😊";
  if (50 <= percent && percent < 0) emoji = "🤔";
  if (percent === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{point}</strong> out of{" "}
        {allPoints} ({percent})
      </p>
      <p className="highscore"> ( Highscore : {hightscore} points )</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        {" "}
        Restart Quiz
      </button>
    </>
  );
}
