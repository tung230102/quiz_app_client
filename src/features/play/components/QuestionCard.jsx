import { useQuiz } from "~/context/QuizContext";
import AnswerOptions from "./AnswerOptions";
import { Heading } from "~/common";

function QuestionCard() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      {question && (
        <>
          <Heading>{question.title}</Heading>
          <div style={{ display: "flex", justifyContent: "center", margin: 8 }}>
            <img
              src={question.thumbnail_link}
              alt="thumbnail_link"
              style={{ maxWidth: "320px", maxHeight: "300px" }}
            />
          </div>
          <AnswerOptions question={question} />
        </>
      )}
    </div>
  );
}

export default QuestionCard;
