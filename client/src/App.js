
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




function App() {
  return (
    <div>
      <BrowserRouter>
    
      <Header />
       <main >
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/produto" element={<Produto /> } />
          <Route path="/fornecedor" element={<Fornecedor />}/>
          <Route path="/cliente" element={<Cliente />}/>
        </Routes>
        </main>
      <Footer />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
