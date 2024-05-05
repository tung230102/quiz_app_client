import { CommonButton } from "~/common";
import { useQuiz } from "~/context/QuizContext";

export default function NextButton() {
  const { dispatch, index, numQuestions } = useQuiz();
  const isLastQuestion = index < numQuestions - 1;

  const handleClick = () => {
    if (isLastQuestion) {
      dispatch({ type: "nextQuestion" });
    } else {
      dispatch({ type: "nextQuestion" });
      dispatch({ type: "finish" });
    }
  };

  return (
    <>
      <CommonButton
        sx={{ float: "right" }}
        onClick={handleClick}
        color={isLastQuestion ? "primary" : "success"}
      >
        {isLastQuestion ? "Next" : "Finish"}
      </CommonButton>
      <CommonButton
        sx={{ float: "right" }}
        disabled={index === 0}
        onClick={() => dispatch({ type: "prevQuestion" })}
      >
        Prev
      </CommonButton>
    </>
  );
}
