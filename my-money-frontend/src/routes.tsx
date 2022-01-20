import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import { Login } from "./screens/login";


export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Switch>
    </BrowserRouter>
  );
};
