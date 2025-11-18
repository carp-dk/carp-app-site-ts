import Typography from "@mui/material/Typography";
import { styled } from "./utils/theme";

export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}));