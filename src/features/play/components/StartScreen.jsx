import { Box, Typography } from "@mui/material";
import { CommonButton } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const paperStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 1,
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <Box sx={paperStyle}>
      <Typography variant="h5" fontWeight={600}>
        Welcome to The React Quiz!
      </Typography>
      <Typography variant="h6" textAlign="center" noWrap>
        {numQuestions} questions to test your React mastery
      </Typography>
      <CommonButton onClick={() => dispatch({ type: "start" })}>
        Let's start
      </CommonButton>
    </Box>
  );
}
