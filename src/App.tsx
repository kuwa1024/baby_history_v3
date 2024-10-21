import { Container } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { auth } from "./app/firebase"
import { SignIn } from "./features/auth/SignIn"
import { SignOut } from "./features/auth/SignOut"
import { History } from "./features/history/History"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user] = useAuthState(auth)

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<History />} />
                  <Route path="/signout" element={<SignOut />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
