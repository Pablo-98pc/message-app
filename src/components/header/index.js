import './header.css'
import { useContext } from 'react';
import { NavLink} from 'react-router-dom';

import {Context} from '../../App';

export default function Header(){
    const data =  useContext(Context); //logged user data
    const {user,setUser} = useContext(Context);
    const handleLogout = (()=> {
        window.localStorage.removeItem('userlogged');
        setUser(null);
    })
    return(
        <div className='top-header'>
            <nav className='header-nav'>
                <NavLink className='name' to ={`/`}>{data.username}</NavLink>
                <NavLink className='logout' to ={`/`} onClick = {handleLogout}>logout</NavLink>
            </nav>
        </div>
    )

}