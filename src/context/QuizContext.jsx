import { createContext, useContext, useReducer } from "react";
import { getListQuestionsPlay, questionsSubmit } from "../api";
import { statusCode } from "../constants";
import { showToast } from "../common";

const QuizContext = createContext();
const TIME_QUESTIONS = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  questionId: "",
  answersId: [],
  listQuestionSubmitted: [],
  secondsRemaining: null,
  listQuestionChecked: [],
  totalScore: 0,
  highScore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * TIME_QUESTIONS,
      };
    case "newAnswer":
      const answersId = [...state.answersId];
      const answerIndex = answersId.indexOf(action.payload);
      const question = state.questions.at(state.index);

      if (answerIndex !== -1) {
        answersId.splice(answerIndex, 1);
      } else {
        answersId.push(action.payload);
      }
      return {
        ...state,
        // questionId: question?.id,
        questionId: question?._id,
        answersId: answersId,
      };
    case "nextQuestion":
      const submittedQuestion = {
        id: state.questionId,
        answersSubmittedId: state.answersId,
      };
      if (state.questionId === 0) {
        return {
          ...state,
          index: state.index + 1,
          questionId: 0,
          answersId: [],
        };
      }
      return {
        ...state,
        index: state.index + 1,
        questionId: 0,
        answersId: [],
        listQuestionSubmitted: [
          ...state.listQuestionSubmitted,
          submittedQuestion,
        ],
      };
    case "prevQuestion":
      const updatedSubmittedList = state.listQuestionSubmitted.slice(0, -1);
      const lastSubmittedQuestion =
        state.listQuestionSubmitted[state.listQuestionSubmitted.length - 1];
      return {
        ...state,
        index: state.index - 1,
        questionId: lastSubmittedQuestion?.id,
        answersId: lastSubmittedQuestion?.answersSubmittedId,
        listQuestionSubmitted: updatedSubmittedList,
      };
    case "finish":
      return {
        ...state,
        listQuestionChecked: action.payload?.listQuestionChecked,
        totalScore: action.payload?.totalScore,
        highScore:
          action.payload?.totalScore > state.highScore
            ? action.payload?.totalScore
            : state.highScore,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "loading",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      break;
  }
};

// eslint-disable-next-line react/prop-types
const QuizProvider = ({ children }) => {
  const [
    {
      status,
      index,
      questions,
      answersId,
      listQuestionSubmitted,
      secondsRemaining,
      listQuestionChecked,
      totalScore,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const handlePlay = (data) => {
    getListQuestionsPlay(data)
      .then((res) => {
        const { message, data } = res || {};

        if (res?.statusCode === statusCode.BAD_REQUEST) {
          dispatch({ type: "dataFailed" });
          const errors = Array.isArray(message) ? message[0] : message;
          showToast(errors, "error");
        } else if (res?.statusCode === statusCode.OK) {
          dispatch({ type: "dataReceived", payload: data?.data });
        } else {
          showToast("Play failed!", "error");
        }
      })
      .catch(() => {
        showToast("An error occurred while fetching questions", "error");
      });
  };

  const handleSubmitQuestion = (data) => {
    questionsSubmit(data).then((res) => {
      if (res?.statusCode === statusCode.BAD_REQUEST) {
        dispatch({ type: "dataFailed" });
        showToast(res?.message, "error");
      } else if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        dispatch({ type: "finish", payload: res?.data });
      } else {
        showToast("Submit Question fail!", "error");
      }
    });
  };

  const value = {
    status,
    index,
    questions,
    answersId,
    listQuestionSubmitted,
    secondsRemaining,
    listQuestionChecked,
    totalScore,
    highScore,
    numQuestions,
    dispatch,
    handlePlay,
    handleSubmitQuestion,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context use outside QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
