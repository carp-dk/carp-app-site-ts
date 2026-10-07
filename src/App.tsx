import { Stack } from "@mui/system";
import { appForHost } from "./apps";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Title } from "./App";
// import { useParams } from "react-router-dom";

console.log(navigator.userAgent);

function App() {
  // const { accessCode } = useParams();
  const app = appForHost(globalThis.location.host);

  const openApp = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const authLink = globalThis.location.href;

    if (isAndroid) {
      globalThis.open(app.androidIntent(authLink), "_blank");
    } else if (isiOS) {
      globalThis.open(app.appStoreUrl);
    } else {
      alert("You are not using an Android or iOS device.");
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={4}
      bgcolor="background.default"
    >
      <a href="https://carp.dk" target="_blank">
        <img src={app.logo} className="logo" alt={app.logoAlt} height={"50vh"} />
      </a>
      <Title variant="h1" textAlign={"center"}>
        Welcome to CARP
      </Title>
      <Typography variant="h3" textAlign={"center"}>
        Click the button below to open or download the {app.name}
      </Typography>
      <Button onClick={openApp} variant="contained" size="large">
        {app.name}
      </Button>
      {/* <Paper
        sx={{
          marginTop: "calc(50%)",
          position: "fixed",
          bottom: 0,
          width: "100%",
          bgcolor: "background.default",
        }}
        component="footer"
        square
        variant="outlined"
      >
        <line></line>
        <Typography variant="h5" align="center" padding={2}>
          &copy; {new Date().getFullYear()} CARP. All rights reserved.
        </Typography>
      </Paper> */}
    </Stack>
  );
}

export default App;
