
import { supabase } from 'backend/supabase'
import Login from 'components/Users/Login'

export default function Home({ lessons }) {
  console.log('Render home')
  // console.log(lessons)
  return (
    <div>
      <h1>Hello</h1>
      <Login/>
    </div>
  )
}

export async function getServerSideProps() {
  const { data: lessons } = await supabase.from('lessons').select('*')

  const slug = 'adding-rooms-and-bridges'
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('slug', slug)
    .single()
  // console.log('Lesson', lesson)
  return {
    props: { lessons },
  }
}
