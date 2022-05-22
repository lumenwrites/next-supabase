import { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from 'backend/supabase'
import { useRouter } from 'next/router'

const Context = createContext({
  user: {} as any,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(Context)

export default function Provider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState() // supabase.auth.user()

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profile')
          .select('*')
          .eq('id', sessionUser.id)
          .single()
        console.log('[AuthContext] Fetched profile data', profile)
        // Combine data from supabase auth table, with data from profile
        setUser({
          ...sessionUser,
          ...profile,
        })
      }
    }

    getUserProfile()

    // Refetch data when user logs in/out
    supabase.auth.onAuthStateChange(() => {
      getUserProfile()
    })
  }, [])

  async function login() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
    console.log('[AuthContext] Log in', { user, session, error })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    console.log('[AuthContext] Log out')
  }

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  )
}
