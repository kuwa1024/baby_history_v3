import { Container } from "@mui/material"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAppSelector } from "./app/hooks"
import { selectCurrentUid } from "./features/auth/authSlice"
import { SignIn } from "./features/auth/SignIn"
import { SignOut } from "./features/auth/SignOut"
import { HistoryEditPage } from "./features/history/HistoryEditPage"
import { HistoryPage } from "./features/history/HistoryPage"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const uid = useAppSelector(selectCurrentUid)

  if (!uid) {
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
                  <Route path="/" element={<HistoryPage />} />
                  <Route path="/edit" element={<HistoryEditPage />} />
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
