import { Button } from "@mui/material"
import { useEffect } from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../app/firebase"
import { useAppDispatch } from "../../app/hooks"
import { login } from "./authSlice"

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  useEffect(() => {
    if (user) {
      dispatch(
        login({
          uid: user.user.uid,
        }),
      )
      navigate("/")
    }
  }, [user])

  if (error) {
    return <p>Error: {error.message}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Button variant="contained" onClick={() => signInWithGoogle()}>
      ログイン
    </Button>
  )
}
