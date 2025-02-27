import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/dashboard"
import { SharedBrain } from "./pages/sharedBrain"
import { AuthRedirect } from "./components/AuthRedirect"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Home } from "./pages/home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <AuthRedirect>
              <Signin />
            </AuthRedirect>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />      

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/shared/:sharedHash" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App
