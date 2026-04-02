import RecipeCard from '../components/RecipeCard'

const Home = ({ recipes, onDelete }) => {
  return (
    <div className="home">
      <div className="grid-wrap">
        <div className="grid-header">
          <span className="grid-label">Saved recipes</span>
        </div>
        <div className="grid">
          {recipes && recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onDelete={onDelete} />
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