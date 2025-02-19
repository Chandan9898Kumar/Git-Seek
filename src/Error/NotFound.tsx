import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { ErrorMessage } from "../utils";
interface ErrorProps {
  isError?: ErrorMessage;
}

// Used const as an assertion in TypeScript .
// Using as const helps catch potential bugs early and makes your code more predictable by ensuring that constant values remain truly constant throughout your application.
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexFlow: "column",
  top: "100px",
  position: "relative",
} as const; // Type is readonly.

//  Example
//  imageStyles.width = 400; // ❌ Error: Cannot assign to 'width' because it is a read-only property
const imageStyle = {
  width: 320,
  height: "auto",
  my: { xs: 5, sm: 10 },
} as const; // Type is readonly:

const NotFoundView: FC<ErrorProps> = ({ isError }) => {
  const navigate = useNavigate();

  const handleHomeClick = (): void => {
    navigate("/");
  };
  return (
    <Container style={containerStyle}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {isError?.title}
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        {isError?.message}
      </Typography>

      <Box
        component="img"
        src="https://free.minimals.cc/assets/illustrations/illustration-404.svg"
        sx={imageStyle}
        loading="lazy"
        alt="404 illustration"
      />

      <Button
        size="large"
        variant="contained"
        color="inherit"
        onClick={handleHomeClick}
      >
        Go to home
      </Button>
    </Container>
  );
};

NotFoundView.displayName = "NotFound";

export default NotFoundView;
