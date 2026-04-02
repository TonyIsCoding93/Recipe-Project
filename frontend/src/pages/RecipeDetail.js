import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const RecipeDetail = ({ onDelete }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch('/api/recipes/' + id)
      const json = await response.json()
      if (response.ok) {
        setRecipe(json)
      }
    }
    fetchRecipe()
  }, [id])

  const handleDelete = async () => {
    const response = await fetch('/api/recipes/' + id, { method: 'DELETE' })
    if (response.ok) {
      onDelete(id)
      navigate('/')
    }
  }

  const handleToggleIngredient = async (ingredientId, currentHave) => {
    const updatedIngredients = recipe.ingredients.map(ing =>
      ing._id === ingredientId ? { ...ing, have: !currentHave } : ing
    )
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }))
    await fetch('/api/recipes/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: updatedIngredients })
    })
  }

    const handleToggleStep = async (stepId, currentCompleted) => {
    const updatedSteps = recipe.steps.map(step =>
        step._id === stepId ? { ...step, completed: !currentCompleted } : step
    )
    setRecipe(prev => ({ ...prev, steps: updatedSteps }))
    await fetch('/api/recipes/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps: updatedSteps })
    })
    }

    const handleReset = async () => {
    const resetIngredients = recipe.ingredients.map(ing => ({ ...ing, have: false }))
    const resetSteps = recipe.steps.map(step => ({ ...step, completed: false }))
    setRecipe(prev => ({ ...prev, ingredients: resetIngredients, steps: resetSteps }))
    await fetch('/api/recipes/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: resetIngredients, steps: resetSteps })
    })
    }

  if (!recipe) return <div className="detail-loading">Loading...</div>

  return (
    <div className="detail-wrap">
      <div className="detail-header">
        <div>
          <p className="detail-source">{recipe.source}</p>
          <h1 className="detail-title">{recipe.title}</h1>
          <p className="detail-description">{recipe.description}</p>
          <div className="detail-meta">
            <span>{recipe.cookTime} mins</span>
            <span>·</span>
            <span>{recipe.servingSize} servings</span>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn-reset" onClick={handleReset}>Reset</button>
          <button className="btn-edit" onClick={() => navigate(`/recipes/${id}/edit`)}>Edit</button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-steps">
          <h2 className="detail-section-title">Instructions</h2>
          {recipe.steps && recipe.steps.map((step, index) => (
            <div
              key={step._id}
              className={`step ${step.completed ? 'step-done' : ''}`}
              onClick={() => handleToggleStep(step._id, step.completed)}
            >
              <div className="step-num">{index + 1}</div>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="detail-ingredients">
          <h2 className="detail-section-title">Ingredients</h2>
          <ul className="ingredient-checklist">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className={`checklist-item ${ingredient.have ? 'have' : ''}`}
                onClick={() => handleToggleIngredient(ingredient._id, ingredient.have)}
              >
                <div className="checkbox">{ingredient.have ? '✓' : ''}</div>
                <div className="checklist-info">
                  <span className="checklist-name">{ingredient.name}</span>
                  <span className="checklist-quantity">{ingredient.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail