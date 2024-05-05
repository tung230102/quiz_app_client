import { Box } from "@mui/material";
import { useQuiz } from "~/context/QuizContext";
import { useTitleDynamic } from "~/hooks";
import Error from "./components/Error";
import FinishScreen from "./components/FinishScreen";
import Loader from "./components/Loader";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import StartScreen from "./components/StartScreen";
import CountdownTimer from "./components/CountdownTimer";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Main from "./layouts/Main";

const app = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function Play() {
  useTitleDynamic("Play");
  const { status } = useQuiz();

  return (
    <Box sx={app}>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && (
          <>
            <Loader />
            <Error />
          </>
        )}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <QuestionCard />
            <Footer>
              <CountdownTimer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </Box>
  );
}

export default Play;
