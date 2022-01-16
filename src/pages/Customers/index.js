import './customers.css'
import Title from '../../components/Title'
import Header from '../../components/Header'

import { FiUser } from 'react-icons/fi'


export default function Customers(){

    return (
        <div className=''>
            <Header/>
            
            <div className="content">
            <Title name="Cliente">
                <FiUser size={25} />
              
            </Title>
            </div>
        </div>
    )


}