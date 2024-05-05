import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  currentQuestion: {},
  nextQuestion: {},
  previousQuestion: {},
  answer: "",
  numberOfQuestions: 0,
  numberOfAnsweredQuestions: 0,
  currentQuestionIndex: 0,
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  hints: 5,
  fiftyFifty: 2,
  usedFiftyFifty: false,
  nextButtonDisabled: false,
  previousButtonDisabled: true,
  previousRandomNumbers: [],
  time: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        currentQuestion: state.questions[state.currentQuestionIndex],
        nextQuestion:
          state.currentQuestionIndex < state.questions.length - 1
            ? state.questions[state.currentQuestionIndex + 1]
            : null,
        previousQuestion:
          state.currentQuestionIndex > 0
            ? state.questions[state.currentQuestionIndex - 1]
            : null,
        numberOfQuestions: state.questions.length,
        answer: state.currentQuestion.answer,
        previousRandomNumbers: [],
        usedFiftyFifty: false,
      };

    case "CORRECT_ANSWER":
      return {
        ...state,
        score: state.score + 1,
        correctAnswers: state.correctAnswers + 1,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1,
      };

    case "WRONG_ANSWER":
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions + 1,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };

    case "USE_HINT":
      return {
        ...state,
        hints: state.hints - 1,
        previousRandomNumbers: state.previousRandomNumbers.concat(
          action.payload
        ),
      };

    case "USE_FIFTY_FIFTY":
      return {
        ...state,
        fiftyFifty: state.fiftyFifty - 1,
        usedFiftyFifty: true,
      };

    case "SET_TIME":
      return {
        ...state,
        time: action.payload,
      };

    case "SET_DISABLE_PREVIOUS_BUTTON":
      return {
        ...state,
        previousButtonDisabled: true,
      };

    case "SET_ENABLE_PREVIOUS_BUTTON":
      return {
        ...state,
        previousButtonDisabled: false,
      };

    case "SET_DISABLE_NEXT_BUTTON":
      return {
        ...state,
        nextButtonDisabled: true,
      };

    case "SET_ENABLE_NEXT_BUTTON":
      return {
        ...state,
        nextButtonDisabled: false,
      };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const test = "tung";
  const value = { test, state, dispatch };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context use outside QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
