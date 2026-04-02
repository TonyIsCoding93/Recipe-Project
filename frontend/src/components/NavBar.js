import { Link } from 'react-router-dom'

const NavBar = ({ recipeCount }) => {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        Recipe<span className="logo-accent">.</span>Vault
      </Link>
      <div className="nav-right">
        <span className="nav-count">{recipeCount} recipes saved</span>
        <Link to="/create" className="add-btn">
          + New Recipe
        </Link>
      </div>
    </nav>
  )
}

export default NavBar