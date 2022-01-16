import { useContext } from 'react'
import './header.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom'
import { FcHome, FcManager, FcSettings } from "react-icons/fc";



export default function Header() {
    const {user} = useContext(AuthContext);
    return(
        <div className="sidebar">
            
            <div>
            {/* condição para verificação da imagem*/}
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl}  alt="foto avatar"/>
            </div>
            <Link to="/dashboard" >
            <FcHome size={24} />
            Chamados
            </Link>
            <Link to="/costumers">
            <FcManager size={24}/>
            Clientes
            </Link>
            <Link to="/profile">
            <FcSettings size={24} />
            Configurações
            </Link>
        </div>
    )
}