import "./Header.css"
import { NavLink, Link } from "react-router-dom";
import { BiArchive } from "react-icons/bi";
import { FcBusinessman, FcCurrencyExchange, FcFilingCabinet, FcInTransit } from "react-icons/fc";
const Header = () => {
  return (
    <header>
        <nav id="nav">
          <Link to="/">Material de construcao</Link>
          
          <ul id="nav-links">
          <li>
            <Link to="/compras"> <i><FcCurrencyExchange /> </i>Compras</Link>
            </li>
          <li>
            <Link to="/vendas"> <i><FcCurrencyExchange /> </i>Vendas</Link>
            </li>
          <li>
            <Link to="/cliente"> <i><FcBusinessman /> </i>Cliente</Link>
            </li>
            <li>
            <Link to="/produto"> <i><FcFilingCabinet /> </i>Produtos</Link>
            </li>
            <li>
            <Link to="/fornecedor"><i><FcInTransit /></i>Fornecedores</Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}

export default Header