
import './App.css';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import Produto from './pages/Produto/Produto';

//Router
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home';
import Modal from './componentes/Modal';
import Fornecedor from './pages/Fornecedor/Fornecedor';
import Cliente from './pages/Cliente/Cliente';
import Vendas from './pages/Vendas/Vendas';
import Pedido from './pages/Pedido/Pedido';
import Compras from './pages/Compra/Compras';
import CompraPedido from './pages/CompraPedido/CompraPedido';
import Login from './pages/Login/Login';




function App() {
  return (
    <div>
      
      <BrowserRouter>
      
      <Header />
       <main >
        <Routes>
        <Route path="/login" element ={<Login />}/>
          <Route path="/" element={<Home /> } />
          <Route path="/produto" element={<Produto /> } />
          <Route path="/fornecedor" element={<Fornecedor />}/>
          <Route path="/cliente" element={<Cliente />}/>
          <Route path="/vendas" element={<Vendas />}/>
          <Route path="/compras" element={<Compras />}/>
          <Route path="/pedidos/:id" element={<Pedido />}/>
          <Route path="/compra/:id" element={<CompraPedido />}/>
          
        </Routes>
        </main>
      <Footer />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
