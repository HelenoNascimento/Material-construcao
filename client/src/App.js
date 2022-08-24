
import './App.css';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import Produto from './pages/Produto/Produto';

function App() {
  return (
    <div>
      <Header />
       <main >
         <Produto />
        </main>
      <Footer />
    </div>
    
  );
}

export default App;
