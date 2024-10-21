import { Button } from "@mui/material"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../app/firebase"

export const SignIn = () => {
  const navigate = useNavigate()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  if (error) {
    return <p>Error: {error.message}</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    navigate("/")
  }
  return (
    <Button variant="contained" onClick={() => signInWithGoogle()}>
      ログイン
    </Button>
  )
}
