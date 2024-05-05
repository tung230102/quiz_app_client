import { useQuiz } from "~/context/QuizContext";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.4rem",
};

function ProgressBar() {
  const { index, numQuestions } = useQuiz();

  return (
    <header style={style}>
      <progress max={numQuestions} value={index + 1} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
    </header>
  );
}

export default ProgressBar;
