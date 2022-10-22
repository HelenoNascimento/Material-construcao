import "./Login.css"
import imgagemEscolhida from '../../Assets/4468233.jpg'
import { useState } from "react"
import authService from "../../Service/authService";




const Login = () => {

    const [ email, setEmail] = useState();
    const [ senha, setSenha] = useState();

    const handleLogar = () =>{
        authService.login(email,senha)
    }

  return (
    <div className="login-container">
        <div className="login-left">
          
        </div>
        <div className="login-right">
        <h2>Fazer Login</h2>
            <div className="inputs">
                
                <div className="row-login">
                  
                    <input type="text"  placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="row-login">
                  
                  
                    <input type="text"  placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div className="row-login">
                    <button onClick={handleLogar}>Entrar</button>
                </div>
              
            </div>
            <h4>Cadastrar</h4>
        </div>

    </div>
  )
}

export default Login