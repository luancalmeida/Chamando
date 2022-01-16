import { useState, useContext } from "react";
import './signin.css';

import { AuthContext } from "../../contexts/auth";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, loadingAuth} = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault();
    

    if(email !== '' && password !== ''){
      signIn(email,password)
    }
    
  }


    return (
      <div className="container-center" >
        <div className="login" >
          <div className="login-area">
            <img src={logo} alt="sistema de login" />
          </div>
          
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" placeholder="Digite seu email" value={email} onChange={(e) =>setEmail(e.target.value)} />
            <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{loadingAuth ? 'carregando...' : 'Acessar'}</button>
          </form>
          <Link to="/register" >Crie sua conta</Link>

        </div>
        
      </div>
    );
  }
  
  export default SignIn;