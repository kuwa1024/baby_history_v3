import { Button } from "@mui/material"
import { signOut } from "firebase/auth"
import { auth } from "../../app/firebase"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "./authSlice"

export const SignOut = () => {
  const dispatch = useAppDispatch()
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      dispatch(logout())
    })
  }

  return (
    <Button variant="contained" onClick={handleSignOut}>
      ログアウト
    </Button>
  )
}
