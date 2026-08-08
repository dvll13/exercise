import './App.css'
import Greeting from './components/Greeting'
import Async from './components/Async'

function App() {
  return (
    <div className="App">
      <section>
        <Greeting />
      </section>

      <section>
        <Async />
      </section>
    </div>
  )
}

export default App
