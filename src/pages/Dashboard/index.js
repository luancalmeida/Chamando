import {useContext} from 'react'

import {AuthContext} from '../../contexts/auth'

export default function Dashboard() {
  const {signOut} = useContext(AuthContext)

    return (
      <div >
        <h2>Usuario</h2>
        <button onClick={()=> signOut() } >Sair</button>
      </div>
    );
  }
  
   