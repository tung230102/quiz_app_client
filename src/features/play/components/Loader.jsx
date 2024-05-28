import { Box, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { getListQuestionsPlay } from "~/api";
import { CommonButton, CommonTextField, Heading, showToast } from "~/common";
import { statusCode } from "~/constants";
import { useQuiz } from "~/context/QuizContext";

const stylePaper = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

const Loader = () => {
  const { dispatch } = useQuiz();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    const categoryArray = getValues("category");
    const category = categoryArray[0]?.value || categoryArray.value;

    const difficultyArray = getValues("difficulty");
    const difficulty = difficultyArray[0]?.value || difficultyArray.value;

    const newData = { ...data, category, difficulty };

    getListQuestionsPlay(newData)
      .then((res) => {
        const { message, data } = res || {};

        if (res?.statusCode === statusCode.BAD_REQUEST) {
          dispatch({ type: "DATA_FAILED" });
          const errors = Array.isArray(message) ? message[0] : message;
          showToast(errors, "error");
        } else if (res?.statusCode === statusCode.OK) {
          dispatch({ type: "DATA_RECEIVED", payload: data?.data });
        } else {
          showToast("Play failed!", "error");
        }
      })
      .catch(() => {
        showToast("An error occurred while fetching questions", "error");
      });
  };

  return (
    <Paper elevation={10} sx={stylePaper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading color="black">Enter your selection to get started</Heading>
        <CommonTextField
          label="Total"
          name="total"
          register={register}
          errors={errors}
          required
          min={2}
          max={10}
          defaultValue={10}
        />
        <Box mt={1}>
          <Controller
            name="category"
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "sports", label: "Sports" },
                  { value: "geography", label: "Geography" },
                  { value: "history", label: "History" },
                  { value: "other", label: "Other" },
                ]}
              />
            )}
            control={control}
            defaultValue={{ value: "sports", label: "Sports" }}
          />
        </Box>
        <Box mt={1}>
          <Controller
            name="difficulty"
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "other", label: "Other" },
                ]}
              />
            )}
            control={control}
            defaultValue={{ value: "easy", label: "Easy" }}
          />
        </Box>

        <CommonButton fullWidth sx={{ mt: 1 }}>
          Begin Test
        </CommonButton>
      </form>
    </Paper>
  );
};

export default Loader;
