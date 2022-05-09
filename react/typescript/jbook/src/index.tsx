import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import CodeCell from './components/code-cell'
import TextEditor from './components/text-editor'
import { store } from './state'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
        {/* <CodeCell /> */}
      </div>
    </Provider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
