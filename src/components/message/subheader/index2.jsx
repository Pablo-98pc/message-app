/* import './message.css' */
import { useState , useContext} from 'react';
import {Context} from '../index';
import getMessages from'../../helpers/getMessages';
import './subheader.css';
export default function Subheader(mydata){
    const data =  useContext(Context);
    console.log(data);
    const aux = data.user.id;
/*     console.log(data);
    console.log(mydata);
    console.log(mydata.element.user_id);
    const current_user = {...mydata.element};
    console.log(current_user);*/
    const userArray = Object.entries(data);
    const messages = await getMessages(aux, 'user');
    return(
        <div className='subheader'>
            <div className='top-subheader'>
                <h1> Conversaciones con: {data.username}</h1>
            </div>
            <div className='bottom-subheader'>
                <h2> Ultimas conversaciones con: {data.username}</h2>
            </div>
        </div>
    )
}
//hacer petición a messages para to y from con el userid o el groupid