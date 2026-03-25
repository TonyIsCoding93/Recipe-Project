import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// pages and components
import Home from './pages/home'
import NavBar from './components/NavBar'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [recipes, setRecipes] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          recipeCount={recipes.length}
          onAddClick={() => setShowForm(!showForm)}
        />

        <div className="hero">
          <p className="hero-label">Your personal cookbook</p>
          <h1 className="hero-title">
            Every<br />
            <span className="hero-title-muted">recipe</span><br />
            you love.
          </h1>
          <p className="hero-sub">
            Save, organize, and track what ingredients you already
            have before your next grocery run.
          </p>
        </div>

        <hr className="divider" />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home showForm={showForm} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App