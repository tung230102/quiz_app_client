import { CommonButton } from "~/common";
import { useQuiz } from "~/context/QuizContext";

export default function AnswerOptions({ question }) {
  const { dispatch, answersId } = useQuiz();

  return (
    <div style={{ width: 600 }}>
      {question?.answers?.map((option) => (
        <CommonButton
          sx={{ mb: 2 }}
          fullWidth
          key={option.id}
          color={answersId.includes(option.id) ? "inherit" : "primary"}
          onClick={() => dispatch({ type: "newAnswer", payload: option.id })}
        >
          {option.content}
        </CommonButton>
      ))}
    </div>
  );
}
