import { Button } from "@mui/material"
import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../../app/firebase"

export const SignOut = () => {
  const [signOut, loading, error] = useSignOut(auth)

  const handleSignOut = async () => {
    await signOut()
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
