import { Button } from "@mui/material"
import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../../app/firebase"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "./authSlice"

export const SignOut = () => {
  const dispatch = useAppDispatch()
  const [signOut, loading, error] = useSignOut(auth)

  const handleSignOut = async () => {
    await signOut().then(() => {
      dispatch(logout())
    })
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Button variant="contained" onClick={handleSignOut}>
        ログアウト
      </Button>
    </>
  )
}
