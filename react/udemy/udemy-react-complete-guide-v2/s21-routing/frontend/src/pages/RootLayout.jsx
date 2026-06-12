import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

export default function RootLayout() {
  const navigation = useNavigation() // get loader's state

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  )
}
