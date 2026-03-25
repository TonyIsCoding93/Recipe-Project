const RecipeCard = ({ recipe }) => {
  const handleDelete = async () => {
    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
      console.log('deleted', json)
    }
  }

  const handleToggleIngredient = async (ingredientId, currentHave) => {
    const updatedIngredients = recipe.ingredients.map((ing) =>
      ing._id === ingredientId ? { ...ing, have: !currentHave } : ing
    )

    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'PATCH',
      body: JSON.stringify({ ingredients: updatedIngredients }),
      headers: { 'Content-Type': 'application/json' }
    })

    const json = await response.json()
    if (response.ok) {
      console.log('updated', json)
    }
  }

  return (
    <div className="card">
      <p className="card-num">
        {recipe.createdAt.substring(0, 10)}
      </p>
      <p className="card-title">{recipe.title}</p>
      <p className="card-meta">
        <span>{recipe.cookTime} min</span> · {recipe.servingSize} servings
      </p>

      <ul className="ingredient-list">
        {recipe.ingredients.map((ingredient) => (
          <li
            key={ingredient._id}
            className={ingredient.have ? 'have' : ''}
            onClick={() => handleToggleIngredient(ingredient._id, ingredient.have)}
          >
            {ingredient.name}
          </li>
        ))}
      </ul>

      <div className="card-footer">
        <span className="card-time">{recipe.cookTime} mins</span>
        <div className="card-actions">
          <button className="btn-sm btn-del" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard