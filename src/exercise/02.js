// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function getFromLocalStorage({key, defaultValue}) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  } catch {
    return defaultValue
  }
}

function useLocalStorage({key, defaultValue = null}) {
  const [value, setValue] = React.useState(() =>
    getFromLocalStorage({key, defaultValue}),
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )

  const [name, setName] = useLocalStorage({
    key: 'name',
    defaultValue: initialName,
  })

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
