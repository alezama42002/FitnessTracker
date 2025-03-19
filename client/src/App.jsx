import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Auth/*" element={<AuthRoutes />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Dashboard/*" element={<MainRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to="/Auth/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;
