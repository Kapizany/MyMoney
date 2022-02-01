import { useState } from "react";
import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { loginAPI } from "./api/login";
import { Dashboard } from "./screens/dashboard";
import { Login } from "./screens/login";
import { Transactions } from "./screens/transaction";


export const Routes = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard selectedPage={selectedPage} setSelectedPage={setSelectedPage} />} />
            <Route path="/transactions" element={<Transactions selectedPage={selectedPage} setSelectedPage={setSelectedPage} />} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

function RequireAuth():React.ReactElement {
    const [authState, setAuthState] = useState({
        "loading": true,
        "isAuthorized": false,
        "userData": {},
    });

    const tokenLocalStorage = localStorage.getItem("mymoney_token")

    if (!tokenLocalStorage) {
        return <Navigate to="/login" />;
    }

    authState.loading && loginAPI.validateToken(tokenLocalStorage).then(
        response => {
            setAuthState({
                "loading": false,
                "isAuthorized": true,
                "userData": response.data,
            })
        }
    ).catch(
        () => {
            setAuthState({
                "loading": false,
                "isAuthorized": false,
                "userData": {},
            })
        }
    )

    return authState.isAuthorized ? <Outlet /> : (
        authState.loading ? <h1>Carregando</h1> : <Navigate to="/login" />
    )
}
