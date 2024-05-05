import { Container, Paper } from "@mui/material";
import { useState } from "react";
import { CommonButton, CommonTextField } from "~/common";
import { useQuiz } from "~/context/QuizContext";

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

function Loader() {
  const [total, setTotal] = useState("");
  const { handlePlay } = useQuiz();

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <CommonTextField
          label="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <CommonButton
          onClick={() => handlePlay(total)}
          sx={{ mt: 1 }}
          fullWidth
        >
          Play
        </CommonButton>
      </Paper>
    </Container>
  );
}

export default Loader;
