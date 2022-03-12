import './message.css'
import { useState, useEffect , useRef, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

    let partner;
    let datetoshow;
    if (messageData) {
        partner = (data.id === messageData.from_user)? messageData.to_user : messageData.from_user;
        datetoshow = new Date(messageData.date);
        datetoshow = datetoshow.toLocaleString();
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
                            <div><p>{datetoshow}</p></div> {/* {new Date().toLocaleTimeString()} */}
                        </div>
                        <div className='message-body'>
                            <p>{messageData.text}</p>
                        </div>
                    </div>
                    <div className='respond'>
                        <textarea type='text' maxLength="300" placeholder ="answer message" ref={answertext} required/>
                        <button type='button' onClick={handleAnswer}>submit</button> {/* aqui debemos hacer post del mensaje */}
                    </div>
                </div>
            </div> : <h1>Charging</h1>
        )

}