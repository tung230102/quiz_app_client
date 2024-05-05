import { useEffect } from "react";
import { useQuiz } from "~/context/QuizContext";

const timer = {
  float: "left",
  fontSize: "16x",
  border: "1px solid #ccc",
  padding: "8px 16px",
  borderRadius: "40px",
};

function CountdownTimer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div style={timer}>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default CountdownTimer;
