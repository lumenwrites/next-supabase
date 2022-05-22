import { useAuth } from 'context/AuthContext'

export default function Login() {
  const { user, login, logout } = useAuth()
  return (
    <>
      {user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </>
  )
}
