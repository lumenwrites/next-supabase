import {
  withPageAuth,
  getUser,
  supabaseServerClient,
} from '@supabase/supabase-auth-helpers/nextjs'

export default function ProtectedPage({ profile }) {
  return <div>Protected content {profile.stripe_customer}</div>
}

export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx)
    console.log('SSR user', user)
    // Fetch profile protected by RLS
    const { data: profile } = await supabaseServerClient(ctx)
      .from('profile')
      .select('*')
      .eq('id', user.id)
      .single()
    console.log('SSR profile', profile)
    return { props: { profile } }
  },
})
