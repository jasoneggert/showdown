export const baseApiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
  return process.env.REACT_APP_API_LOCAL_BASE_URL
  } else {
    return process.env.REACT_APP_API_PROD_BASE_URL
  }
}
