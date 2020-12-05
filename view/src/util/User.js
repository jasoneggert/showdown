import React from "react";
import { useAuthedAxios } from "../hooks/useAuthedAxios";
import { useHistory } from "react-router-dom";

const User = ({ children }) => {
  const [
    { data: userData, loading: userLoading, error: userError },
    { refetch: userRefetch },
  ] = useAuthedAxios("/user");
  const history = useHistory();
  if (userLoading) {
    return <div>Loading..</div>;
  }

  if (userError) {
    console.log("error");
    history.push("./login");
  }
  return children(userData);
};

export default User;
