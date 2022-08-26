import "./Header.css"
import { NavLink, Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
        <nav id="nav">
          <Link to="/">Material de construcao</Link>
          
          <ul id="nav-links">
            <li>
            <Link to="/produto">Produtos</Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Header