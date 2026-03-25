import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import RecipeForm from '../components/RecipeForm'

const Home = ({ showForm }) => {
  const [recipes, setRecipes] = useState(null)

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

  return (
    <div className="home">
      {showForm && <RecipeForm />}

      <div className="grid-wrap">
        <div className="grid-header">
          <span className="grid-label">Saved recipes</span>
        </div>
        <div className="grid">
          {recipes && recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        {recipes && recipes.length === 0 && (
          <div className="empty">
            <p>No recipes yet — add your first one above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home