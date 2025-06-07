import { useEffect } from 'react'
import { useTheme } from './store/useFeedbackStore'
import Home from './pages/Home'
import './App.css'

function App() {
  const theme = useTheme()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <main>
      <Home />
    </main>
  )
}

export default App
