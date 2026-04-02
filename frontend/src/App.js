import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/home'
import NavBar from './components/NavBar'
import RecipeDetail from './pages/RecipeDetail'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes')
      const json = await response.json()
      if (response.ok) {
        setRecipes(json)
      }
    }
    fetchRecipes()
  }, [])

  const handleRecipeAdded = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev])
  }

  const handleRecipeDeleted = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe._id !== id))
  }

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecipes(prev => prev.map(recipe =>
      recipe._id === updatedRecipe._id ? updatedRecipe : recipe
    ))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar recipeCount={recipes.length} />
        <Routes>
          <Route path="/" element={<Home recipes={recipes} onDelete={handleRecipeDeleted} />} />
          <Route path="/create" element={<CreateRecipe onRecipeAdded={handleRecipeAdded} />} />
          <Route path="/recipes/:id" element={<RecipeDetail onDelete={handleRecipeDeleted} />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe onRecipeUpdated={handleRecipeUpdated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App