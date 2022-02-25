/* import './message.css' */
import { useState , useContext} from 'react';
import {Context} from '../index';
import getMessages from'../helpers/getMessages';
export default function Subheader(mydata){
    const data =  useContext(Context);
    console.log(data);
    console.log(mydata);
    console.log(mydata.element.user_id);
    const current_user = {...mydata.element};
    console.log(current_user);
    const userArray = Object.entries(current_user);
    console.log(userArray);
    /* console.log(getMessages(current_user.user_id, 'user')); */
    return(
        <div className='subheader'>
            <h1> Conversanciones con: {current_user.username}</h1>
            <h2>{current_user.first_name}{current_user.last_name}</h2>
            <p>Información</p>
            <pre>{userArray}</pre>
        </div>
    )
}
//hacer petición a messages para to y from con el userid o el groupid