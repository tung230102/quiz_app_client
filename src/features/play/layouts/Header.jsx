import { Typography } from "@mui/material";

const app_header = {
  display: "flex",
  alignItems: "center",
};

function Header() {
  return (
    <header style={app_header}>
      <img
        src="logo192.png"
        alt="React logo"
        style={{ width: "60px", marginRight: "8px" }}
      />
      <Typography variant="h4">The React Quiz</Typography>
    </header>
  );
}

export default Header;
