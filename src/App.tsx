import { Stack } from "@mui/system";
import carpLogo from "./assets/logo-carp-flat-colored.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Title } from "./App";
import { useParams } from "react-router-dom";

console.log(navigator.userAgent);

function App() {
  const { accessCode } = useParams();

  const openApp = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      const fallbackUrl = encodeURIComponent(
        "https://play.google.com/store/apps/details?id=dk.cachet.carp_study_app"
      );

      const intentUrl = `intent://${
        accessCode ?? ""
      }#Intent;scheme=carp-studies;package=dk.cachet.carp_study_app;S.browser_fallback_url=${fallbackUrl};end`;

      globalThis.open(intentUrl);
    } else if (isiOS) {
      setTimeout(() => {
        globalThis.open(
          "https://apps.apple.com/us/app/carp-studies/id1569798025",
          "_blank"
        );
      }, 2000);
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
        <img src={carpLogo} className="logo" alt="CARP logo" height={"50vh"} />
      </a>
      <Title variant="h1" textAlign={"center"}>
        Welcome to CARP
      </Title>
      <Typography variant="h3" textAlign={"center"}>
        Click the button below to open or download the CARP Studies App
      </Typography>
      <Button onClick={openApp} variant="contained" size="large">
        CARP Studies App
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
