import './message.css'
import { useState, useEffect, createContext , useRef, useCallback, useContext } from 'react';
import { useParams , NavLink} from 'react-router-dom';
import getData from '../helpers/getData';
import getMessageById from'../helpers/getMessageById';
import {Context} from '../../App';

export default function Message(){
    const {messageData, setMessageData} = useState(null);
    const messageid = useParams(); //message id from url
    const data =  useContext(Context); //logged user data
    const answertext = useRef(); //ref to get answer text

    const getmessage= useCallback(async () => {
        await getMessageById(messageid)
            .then ((newData) => {
            setMessageData({...newData.data});
        })
    },[]);
    getmessage();
    let partner = data.id === messageData.from_user? messageData.to_user : messageData.from_user;
    return(
        <div className='main'>
            <div>
                <h1>Conversaciones con {partner}</h1>
            </div>
            <div className='message-header'>
                <div><p>{messageData.subject}</p></div>
                <div><p>{messageData.date}</p></div>
            </div>
            <div className='message-body'>
                <p>{messageData.text}</p>
            </div>
            <div className='respond'>
                <input type='text' rel={answertext}></input>
                <button type='button' /* onClick={handleAnswer} */>responder</button>
            </div>
        </div>
    )
}