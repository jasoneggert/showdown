export const baseApiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_LOCAL_BASE_API_URL;
  } else {
    return process.env.REACT_APP_PROD_BASE_API_URL;
  }
};
