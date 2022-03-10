import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCatsFetch } from './catState'
import './App.css'

function App() {
  const cats = useSelector((state) => state.cats.cats)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCatsFetch())
  }, [dispatch])
  console.log(cats)

  return (
    <div className="App">
      <h1>Cat species gallery</h1>
      <p>Images of different cats.</p>
      <hr />
      <div className="Gallery">
        {cats.map((cat) => (
          <div className="row" key={cat.id}>
            <div className="column column-left">
              <img src={cat.image.url} alt={cat.name} width="200" height="200" />
            </div>
            <div className="column column-right">
              <h2>{cat.name}</h2>
              <h5>Temperament: {cat.temperament}</h5>
              <p>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(getCatsFetch({ fetchAfter: cats.length }))}>VIEW MORE CATS</button>
    </div>
  )
}

export default App
