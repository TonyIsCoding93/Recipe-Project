import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe, onDelete }) => {
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.stopPropagation()
    const response = await fetch('/api/recipes/' + recipe._id, {
      method: 'DELETE'
    })
    if (response.ok) {
      onDelete(recipe._id)
    }
  }

  return (
    <div className="card" onClick={() => navigate(`/recipes/${recipe._id}`)}>
      <p className="card-num">{recipe.createdAt.substring(0, 10)}</p>
      <p className="card-title">{recipe.title}</p>
      <p className="card-meta">
        <span>{recipe.cookTime} min</span> · {recipe.servingSize} servings
      </p>
      <ul className="ingredient-list">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient._id} className={ingredient.have ? 'have' : ''}>
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