import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditRecipe = ({ onRecipeUpdated }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQuantity, setIngredientQuantity] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch('/api/recipes/' + id)
      const json = await response.json()
      if (response.ok) {
        setTitle(json.title)
        setSource(json.source)
        setDescription(json.description)
        setInstructions(json.instructions)
        setCookTime(json.cookTime)
        setServingSize(json.servingSize)
        setIngredients(json.ingredients)
      }
    }
    fetchRecipe()
  }, [id])

  const handleAddIngredient = () => {
    if (!ingredientName.trim()) return
    setIngredients(prev => [...prev, {
      name: ingredientName.trim(),
      quantity: ingredientQuantity.trim(),
      have: false
    }])
    setIngredientName('')
    setIngredientQuantity('')
  }

  const handleRemoveIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title || !instructions) {
      setError('Title and instructions are required')
      return
    }

    const steps = instructions
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => ({ text: s, completed: false }))

    const response = await fetch('/api/recipes/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        source,
        description,
        ingredients,
        instructions,
        steps,
        cookTime: Number(cookTime),
        servingSize: Number(servingSize)
      })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      return
    }

    onRecipeUpdated(json)
    navigate('/')
  }

  return (
    <div className="form-wrap">
      <div className="form-inner">
        <p className="form-heading">→ Edit recipe</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <p className="f-label">Recipe name</p>
              <input className="f-input" type="text" placeholder="e.g. Spaghetti Carbonara" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <p className="f-label">Source</p>
              <input className="f-input" type="text" placeholder="e.g. Grandma, NYT Cooking" value={source} onChange={(e) => setSource(e.target.value)} />
            </div>
          </div>

          <div className="form-row full">
            <div>
              <p className="f-label">Description</p>
              <input className="f-input" type="text" placeholder="Brief description of the recipe" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div>
              <p className="f-label">Cook time (mins)</p>
              <input className="f-input" type="number" placeholder="e.g. 30" value={cookTime} onChange={(e) => setCookTime(e.target.value)} />
            </div>
            <div>
              <p className="f-label">Serving size</p>
              <input className="f-input" type="number" placeholder="e.g. 4" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
            </div>
          </div>

          <div className="form-row full">
            <div>
              <p className="f-label">Ingredients</p>
              <div className="ingredient-input-row">
                <input className="f-input" type="text" placeholder="Ingredient name" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} />
                <input className="f-input" type="text" placeholder="Quantity e.g. 200g" value={ingredientQuantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
                <button type="button" className="add-ingredient-btn" onClick={handleAddIngredient}>+</button>
              </div>
              {ingredients.length > 0 && (
                <ul className="ingredient-preview">
                  {ingredients.map((ing, index) => (
                    <li key={index}>
                      <span>{ing.quantity} {ing.name}</span>
                      <button type="button" onClick={() => handleRemoveIngredient(index)}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-row full">
            <div>
              <p className="f-label">Instructions</p>
              <p className="f-hint">Separate each step with a period.</p>
              <textarea className="f-textarea" placeholder="Step 1. Step 2. Step 3." value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate(`/recipes/${id}`)}>Cancel</button>
            <button type="submit" className="submit-btn">Save Changes →</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditRecipe