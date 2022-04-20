import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loginAPI } from "../../api/login";


export function RequireAuth() {
  const [authState, setAuthState] = useState({
    loading: true,
    isAuthorized: false,
    userData: {},
  });

  const tokenLocalStorage = localStorage.getItem("mymoney_token");

  if (!tokenLocalStorage) {
    return <Navigate to="/login" />;
  }

  authState.loading &&
    loginAPI.validateToken(tokenLocalStorage)
    .then((response) => {
      setAuthState({
        loading: false,
        isAuthorized: true,
        userData: response.data,
      });
    })
    .catch(() => {
      setAuthState({
        loading: false,
        isAuthorized: false,
        userData: {},
      });
    });

  return authState.isAuthorized ? (
    <Outlet />
  ) : authState.loading ? (
    <h1>Carregando</h1>
  ) : (
    <Navigate to="/login" />
  );
}
