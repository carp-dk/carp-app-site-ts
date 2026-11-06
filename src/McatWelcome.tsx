import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import hero from "./assets/mcat-welcome-hero.png";

const primary = "#4F39F6";

const copy = {
  en: {
    title: "WELCOME TO mCAT",
    body: "Click the button below to open or download the app",
    footnote:
      "The app is part of the Copenhagen Research Platform (CARP), developed and hosted by the Department of Health Technology at the Technical University of Denmark (DTU)",
    button: "Get Started",
  },
  da: {
    title: "VELKOMMEN TIL mCAT",
    body: "Tryk på knappen nedenfor for at åbne eller downloade appen",
    footnote:
      "Appen er en del af Copenhagen Research Platform (CARP), udviklet og hostet af Institut for Sundhedsteknologi ved Danmarks Tekniske Universitet (DTU)",
    button: "Kom i gang",
  },
};

/**
 * mCAT's landing page: Figma "Welcome to mCAT 1" (`1971:6649`), the same
 * welcome the app and its App Clip open with. Danish when the browser prefers
 * it, English otherwise.
 */
export function McatWelcome({ onOpenApp }: { onOpenApp: () => void }) {
  const text = navigator.language.startsWith("da") ? copy.da : copy.en;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#F2F2F7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        pt: 10,
        pb: 2,
        fontFamily: "'Open Sans', sans-serif",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={hero}
        alt=""
        sx={{ width: "100%", maxWidth: 382, aspectRatio: "1" }}
      />
      <Typography
        component="h1"
        sx={{ mt: 1.5, font: "inherit", fontWeight: 700, fontSize: 28, lineHeight: "50px", color: primary }}
      >
        {text.title}
      </Typography>
      <Typography
        sx={{ mt: 2, maxWidth: 244, font: "inherit", fontWeight: 600, fontSize: 16, lineHeight: "24px", color: "#1A1A1A" }}
      >
        {text.body}
      </Typography>
      <Typography
        sx={{ mt: "auto", pt: 5, maxWidth: 342, font: "inherit", fontWeight: 400, fontSize: 14, color: "#444" }}
      >
        {text.footnote}
      </Typography>
      <Button
        onClick={onOpenApp}
        disableElevation
        sx={{
          mt: 3,
          width: 300,
          maxWidth: "100%",
          height: 54,
          borderRadius: "30px",
          bgcolor: primary,
          color: "white",
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: 18,
          textTransform: "none",
          filter: "drop-shadow(0 4px 8px rgba(19, 0, 163, 0.5))",
          "&:hover": { bgcolor: primary },
        }}
      >
        {text.button}
      </Button>
    </Box>
  );
}
