import './conversation.css'
import { useState, useEffect, createContext , useCallback, useContext } from 'react';
import { useParams , NavLink} from 'react-router-dom';
import getData from '../helpers/getData';
import getMessagesBetween from'../helpers/getMessagesBetween';
import {Context} from '../../App';

export default function Conversation(){
    const data =  useContext(Context); //logged user data
    const {type, id} = useParams(); //type(user or group) and id of conversation counterpart
    /* id  = 1; */
    /* type = 'users'; *///esto no se como pasarlo, si por props, por context o por link
    const [mydata, setMyData] = useState([]);
    const [mydataMessages, setMyDataMessages] = useState([]);

    const setData = useCallback(() => {
         getData(id,type)
            .then ((newData) => {
                setMyData(newData.data);
            })
    },[id,type]);
    const userLogged = 2;// esto ya está en contexto, sería data.id
    console.log(id);
    const setMessages = () => {
         getMessagesBetween(id,userLogged,type)
            .then ((newData) => {
                setMyDataMessages(newData.data.rows);
            })
    };
//si yo lo que tendría que pedir serían los mensajes?????????? o no.
    useEffect(() => {
        setMessages();
        setData();
    }, [id])
   //condicionar el renderizado a mydata, si es null, no renderizar
    console.log(mydata);
    const tester = data.length > 0 ? true : false;
    if (mydata.length === 0) {
        console.log(mydata);
      return(
          <h1>charging</h1>
      );
    }
    else {
        console.log(mydata);
        console.log(mydataMessages);
        return(
            <div className='subheader'>
            <div className='top-subheader'>
                <h1> Conversaciones con: {data.from_user}</h1> {/* ¿como obtengo este nombre?, tengo el id, no el nombre */}
            </div>
            <div className="main-subheader">
                <div className='top-subheader'>
                    {/* <h2> Conversaciones con: {conversationwith.username}</h2> */}
                    {tester && <h2>Your conversations with {mydataMessages.username}</h2>}
                    {!tester && <h2>You don't have conversations with {mydataMessages.username} yet</h2>}
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
} 
/*  ¿hago aquí un router a las distintas paginas, minimo la que muestra todos los mensajes(con rederizado condicionado por si hay mensajes o no), la que muestra el mensaje en particular y la de mensaje nuevo? */