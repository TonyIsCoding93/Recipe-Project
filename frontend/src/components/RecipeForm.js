import { useState } from 'react'

const RecipeForm = () => {
  const [title, setTitle] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    
    const ingredientArray = ingredients
      .split(',')
      .map((item) => ({
        name: item.trim(),
        amount: '',
        have: false
      }))

    const recipe = {
      title,
      cookTime: Number(cookTime),
      servingSize: Number(servingSize),
      ingredients: ingredientArray,
      instructions
    }

    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTitle('')
      setCookTime('')
      setServingSize('')
      setIngredients('')
      setInstructions('')
      console.log('new recipe added', json)
    }
  }

  return (
    <div className="form-wrap">
      <div className="form-inner">
        <p className="form-heading">→ Add new recipe</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <p className="f-label">Recipe name</p>
              <input
                className="f-input"
                type="text"
                placeholder="e.g. Spaghetti Carbonara"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <p className="f-label">Cook time (mins)</p>
              <input
                className="f-input"
                type="number"
                placeholder="e.g. 30"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <p className="f-label">Serving size</p>
              <input
                className="f-input"
                type="number"
                placeholder="e.g. 4"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
              />
            </div>
            <div>
              <p className="f-label">Ingredients</p>
              <input
                className="f-input"
                type="text"
                placeholder="pasta, eggs, bacon, parmesan"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row full">
            <div>
              <p className="f-label">Instructions</p>
              <textarea
                className="f-textarea"
                placeholder="Walk through the recipe step by step..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>

          <div className="form-footer">
            <span className="form-hint">Separate ingredients with commas</span>
            <button className="submit-btn">Save Recipe →</button>
          </div>

          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default RecipeForm
