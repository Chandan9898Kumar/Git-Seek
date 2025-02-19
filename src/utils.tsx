export type ErrorMessage = {
  title: string;
  message: string;
};

export const getErrorMessage = (status: number): ErrorMessage => {
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
        message:
          "Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps " +
          "you&apos;ve mistyped the URL? Be sure to check your spelling.",
      };
  }
};

const isNumeric = (str: string): boolean => {
  return !isNaN(parseFloat(str)) && isFinite(Number(str));
};

export const extractNumberSafe = (str: string): number => {
  const words = str.split(" ");
  for (const word of words) {
    if (isNumeric(word)) {
      return Number(word);
    }
  }
  return 200;
};
