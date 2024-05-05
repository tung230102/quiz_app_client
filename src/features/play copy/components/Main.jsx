import { Box, Container, Fab, Grid, Paper } from "@mui/material";
import { CommonButton, CommonTextField, Heading } from "~/common";

const styleHeader = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const stylePaper = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

const Main = () => {
  const process = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const questions = [
    {
      id: 1,
      title: "1 + 1 = ?",
      thumbnail_link: "logo192.png",
      answers: [
        {
          id: 17,
          content: "1",
        },
        {
          id: 18,
          content:
            "Material Design interfaces need to be able to adapt their layout at various breakpoints",
        },
        {
          id: 19,
          content: "2",
        },
      ],
    },
    {
      id: 2,
      title: "2 + 2 = ?",
      thumbnail_link: "img/answer.png",
      answers: [
        {
          id: 171,
          content: "2",
        },
        {
          id: 181,
          content: "2",
        },
        {
          id: 191,
          content: "4",
        },
      ],
    },
    {
      id: 3,
      title: "5 + 5 = ?",
      thumbnail_link: "img/background.jpg",
      answers: [
        {
          id: 172,
          content: "5",
        },
        {
          id: 182,
          content: "5",
        },
        {
          id: 192,
          content: "10",
        },
      ],
    },
  ];

  const question = questions[0];

  return (
    <Container sx={{ margin: "40px auto" }}>
      {/* header */}
      <header style={styleHeader}>
        <img
          src="logo192.png"
          alt="React logo"
          style={{ width: "60px", marginRight: "8px" }}
        />
        <Heading variant="h4">The React Quiz</Heading>
      </header>

      {/* main */}
      <Paper elevation={10} sx={stylePaper}>
        <CommonTextField label="Total" />
        <CommonButton sx={{ mt: 1 }} fullWidth>
          Play
        </CommonButton>
      </Paper>

      {/* quiz  */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {/* process */}
            {process.map((p, i) => (
              <Fab key={i} size="small" sx={{ m: 0.5 }} color="primary">
                {p + 1}
              </Fab>
            ))}
          </Grid>
          <Grid item xs={12} sm={8}>
            <div className="quiz">
              <Heading>{question.title}</Heading>
              <div
                style={{ display: "flex", justifyContent: "center", margin: 8 }}
              >
                <img
                  src={question.thumbnail_link}
                  alt="thumbnail"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="questions">
                {question.answers.map((option) => (
                  <CommonButton
                    sx={{ mb: 1 }}
                    fullWidth
                    key={option.id}
                    color="inherit"
                  >
                    {option.content}
                  </CommonButton>
                ))}
              </div>

              <div className="button">
                <CommonButton sx={{ float: "right" }} color="success">
                  Next
                </CommonButton>
                <CommonButton sx={{ float: "right", mr: 1 }}>Prev</CommonButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* result */}
      <>
        <span>Username</span>
        <span>Total Quiz Points : </span>
        <span>Total Questions : </span>
        <span>Total Earn Points :</span>
        <span>Quiz Result</span>

        <table>
          <thead className="table-header">
            <tr className="table-row">
              <td>Name</td>
              <td>Attempts</td>
              <td>Earn Points</td>
              <td>Result</td>
            </tr>
          </thead>
          <tbody>
            <tr className="table-body">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </>
    </Container>
  );
};

export default Main;
