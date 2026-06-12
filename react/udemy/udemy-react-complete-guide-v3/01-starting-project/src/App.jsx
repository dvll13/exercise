import React from 'react'
import reactImage from './assets/react-core-concepts.png'

const reactDescriptions = ['Fundamental', 'Crucial', 'Core']

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

function getRandomArrEl(arr) {
  const maxIdx = arr.length - 1
  const randIdx = genRandomInt(maxIdx)

  return arr[randIdx]
}

const getRandomAdj = () => getRandomArrEl(reactDescriptions)

function Header() {
  const [adjective, setAdjective] = React.useState(getRandomAdj)

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newAdj = getRandomAdj()
  //     setAdjective(newAdj)
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  return (
    <header>
      <img src={reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>{adjective} React concepts you will need for almost any app you are going to build!</p>
    </header>
  )
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  )
}

export default App
