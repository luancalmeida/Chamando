import { useState, useContext } from "react";
import './signup.css';
import {AuthContext} from '../../contexts/auth'
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  const { signUp} = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault();
    
    if(nome != '' && email != '' && password != ''){
      signUp(email, password, nome)
    }

    
  }


    return (
      <div className="container-center" >
        <div className="login" >
          <div className="login-area">
            <img src={logo} alt="sistema de login" />
          </div>
          
          <form onSubmit={handleSubmit}>
            <h1>Cadastre-se</h1>
            <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) =>setNome(e.target.value) } />
            <input type="text" placeholder="Digite seu email" value={email} onChange={(e) =>setEmail(e.target.value)} />
            <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Cadastrar</button>
          </form>
          <Link to="/" >Já tem Conta? Acesse.</Link>

        </div>
        
      </div>
    );
  }
  
  export default SignIn;