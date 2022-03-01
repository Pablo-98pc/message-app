/* import './message.css' */
import { useState , useContext} from 'react';
import {Context} from '../index';
import {Conversation} from '../index';
import { NavLink ,useParams} from "react-router-dom";
import getMessages from'../../helpers/getMessages';
import './subheader.css';
export default function Subheader(type, idprop){
    const {id} = useParams(); 
    const data =  useContext(Context);
    const conversationwith =  useContext(Conversation);
    console.log(data);
    console.log(id);
    return(
        <div className='subheader'>
            <div className='top-subheader'>
                <h1> Conversaciones con: {data.from_user}</h1> {/* ¿como obtengo este nombre?, tengo el id, no el nombre */}
            </div>
            <div className="main-subheader">
                <div className='top-subheader'>
                    {/* <h2> Conversaciones con: {conversationwith.username}</h2> */}
                    {tester && <h2>Your conversations with {conversationwith.username}</h2>}
                    {!tester && <h2>You don't have conversations with {conversationwith.username} yet</h2>}
                </div>
                {tester && <div className='bottom-subheader'>
                {data.map((element, index) => (index < 3? 
                    <div className="message" key={index}>
                        <div className='message-subject'>
                            <NavLink className="subject" to={`/message/${element.id}`}>{element.subject}</NavLink> 
                            {/* <button className="subject">{element.subject}</button> */}
                        </div>
                        <div>
                            <h4>{element.date}</h4>
                        </div>
                    </div> : null
                ))}
                </div>}
                <div className='newmessage'>
                    <NavLink className='newmessage-button' to='/newmessage'>New Message</NavLink>
                </div>
            </div>
        </div>)
    
}
//hacer petición a messages para to y from con el userid o el groupid