import { useState } from "react";
import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Dashboard } from "./screens/dashboard";
import { Login } from "./screens/login";
import { Transactions } from "./screens/transactions";


export const Routes = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            }
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
