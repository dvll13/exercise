import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Submenu from './components/Submenu'

const App: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <Submenu />
      <Hero />
    </main>
  )
}
export default App
