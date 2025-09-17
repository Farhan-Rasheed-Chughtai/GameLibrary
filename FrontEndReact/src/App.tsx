import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Signup from "./SignUp";
import GameLibrary from "./GameLibrary";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/GameLibrary"
          element={
            <ProtectedRoute>
              <GameLibrary />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
