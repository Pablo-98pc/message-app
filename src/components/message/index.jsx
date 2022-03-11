import './message.css'
import { useState, useEffect, createContext , useRef, useCallback, useContext } from 'react';
import { useParams , NavLink} from 'react-router-dom';
import getData from '../helpers/getData';
import getMessageById from'../helpers/getMessageById';
import postNewMessage from '../helpers/postNewMessage';
import {Context} from '../../App';

export default function Message(){
    const [messageData, setMessagedata] = useState({});
    const {id} = useParams(); //message id from url
    const data =  useContext(Context); //logged user data
    const answertext = useRef(); //ref to get answer text
    const type = 'user';
    const handleAnswer = async () => {
        let bodytosend = {groupmessage:false,text: answertext.current.value, subject: messageData.subject, 
            from_user: data.id, to_user: partner, date:new Date()};
        console.log(bodytosend);
        await postNewMessage(bodytosend,type) 
            .then ((newData) => {
                console.log(newData);
            })
            answertext.current.value = "";
    }
    
    const getmessage= useCallback( async () => {
         await getMessageById(id)
            .then ((newData) => {
                console.log(newData);
                setMessagedata(newData.data);
        })
        console.log(messageData);
    },[id]);
    useEffect(async () => {
        await getmessage();
    },[]);
    
    /*     useEffect(() => {
        getmessage();
    },[]); */

    let partner;
    if (messageData) {
        partner = (data.id === messageData.from_user)? messageData.to_user : messageData.from_user;
            console.log(messageData);
            console.log(partner);
    }
        return(
            messageData?
            <div className='main'>
                <div class ="main-header">
                    <h2>Conversaciones con {partner}</h2> {/* aqui solo estoy mostrando el id, deberiamos mostrar el username  */}
                </div>
                <div className="main-body">
                    <div className="main-body-message">
                        <div className='message-header'>
                            <div><p>{messageData.subject}</p></div>
                            <div><p>{messageData.date}</p></div> {/* {new Date().toLocaleTimeString()} */}
                        </div>
                        <div className='message-body'>
                            <p>{messageData.text}</p>
                        </div>
                    </div>
                    <div className='respond'>
                        <input type='text' maxLength="300" placeholder ="texto" ref={answertext} required></input>
                        <button type='button' onClick={handleAnswer}>responder</button> {/* aqui debemos hacer post del mensaje */}
                    </div>
                </div>
{/*                 from_user: data.id
                to_user: partner
                subject: messageData.subject
                data: Date.now();
                text: answertext.current.value
                tambien debemos saber si es grupo o no. */}

            </div> : <h1>Charging</h1>
        )

}