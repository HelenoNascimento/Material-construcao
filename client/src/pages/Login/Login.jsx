import "./Login.css"
import imgagemEscolhida from '../../Assets/4468233.jpg'

const Login = () => {
  return (
    <div className="login-container">
        <div className="login-left">
          
        </div>
        <div className="login-right">
        <h2>Fazer Login</h2>
            <div className="inputs">
                
                <div className="row-login">
                  
                    <input type="text"  placeholder="Login"/>
                </div>
                <div className="row-login">
                  
                  
                    <input type="text"  placeholder="Senha"/>
                </div>
                <div className="row-login">
                    <button>Entrar</button>
                </div>
              
            </div>
            <h4>Cadastrar</h4>
        </div>

    </div>
  )
}

export default Login