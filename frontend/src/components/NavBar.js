import { Link } from 'react-router-dom'

const NavBar = ({ recipeCount, onAddClick }) => {
  return (
    <nav className="nav">
      <div className="logo">
        Recipe<span className="logo-accent">.</span>Vault
      </div>
      <div className="nav-right">
        <span className="nav-count">{recipeCount} recipes saved</span>
        <button className="add-btn" onClick={onAddClick}>
          + New Recipe
        </button>
      </div>
    </nav>
  )
}

export default NavBar