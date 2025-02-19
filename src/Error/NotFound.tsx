import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface ErrorProps {
  isError?: string;
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

type ErrorMessage = {
  title: string;
  message: string;
};

const getErrorMessage = (status: number): ErrorMessage => {
  switch (status) {
    case 404:
      return {
        title: "User Not Found",
        message:
          "We couldn't find the GitHub user you're looking for. Please check the username and try again.",
      };
    case 403:
      return {
        title: "Rate Limit Exceeded",
        message:
          "You've hit the GitHub API rate limit. Please try again in a few minutes.",
      };
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
      };
    default:
      return {
        title: "Oops! Something Went Wrong",
        message: "An unexpected error occurred. Please try again.",
      };
  }
};

const NotFoundView: FC<ErrorProps> = ({ isError }) => {
  const navigate = useNavigate();

  const handleHomeClick = (): void => {
    navigate("/");
  };
  return (
    <Container style={containerStyle}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Sorry, page not found!
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
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
