import './newmessage.css'
import { useState, useEffect, createContext , useRef, useCallback, useContext } from 'react';
import { useParams , NavLink} from 'react-router-dom';
import postNewMessage from '../helpers/postNewMessage';
import {Context} from '../../App';

export default function NewMessage(){
/*     const {message, setMessage} = useState('');
    const {subject, setSubject} = useState('');
    const {receiver, setReceiver} = useState(''); */
    const data =  useContext(Context); //logged user data
    const type = 'user';
    const subject = useRef();
    const message = useRef();
    const receiver = useRef();

/*     const handleAnswer = async (event) => {
        event.preventDefault();
        let bodytosend = {groupmessage:false,text: message, subject: subject, 
            from_user: data.id, to_user: receiver, date:new Date()};
        console.log(bodytosend);
        await postNewMessage(bodytosend,type) 
            .then ((newData) => {
                console.log(newData);
            })

    } */

    const handleAnswer = async (event) => {
        let bodytosend = {groupmessage:false,text: message.current.value, subject: subject.current.value, 
            from_user: data.id, to_user: parseInt(receiver.current.value), date:new Date()};
        console.log(bodytosend);
        await postNewMessage(bodytosend,type) 
            .then ((newData) => {
                console.log(newData);
            })

    }

/*     useEffect(async() => {
        await getmessage();
    },[]); */

/*     useEffect(() => {
        getmessage();
    },[]); */

          return(
            <div className='main'>
                <div class="new-message">
                    <div className='form-header'>
                        <input type="text" placeholder="subject" ref ={subject} name ='subject'/>
                        <input type="text" placeholder="to" name ='touser' ref ={receiver} required/>
                    </div>
                    <div className='form-message'>
                        <input type="text" placeholder="Text" name ="message" ref ={message} required/>
                    </div>
                    <div className='form-button'>
                        <button onClick={handleAnswer}>Submit</button>
                    </div>
                </div>
{/*                 <form class="new-message" onSubmit={handleAnswer}>
                    <div className='form-header'>
                        <input type="text" placeholder="subject" name ='subject' onChange={({event})=> setSubject(event.target.value)}/>
                        <input type="text" placeholder="to" name ='touser' onChange={({event})=> setReceiver(event.target.value)}/>
                    </div>
                    <div className='form-message'>
                        <input type="text" placeholder="Text" name ="message" onChange={({event})=> setMessage(event.target.value)}/>
                    </div>
                    <div className='form-button'>
                        <input type="buttón">Submmit</input>
                    </div>
                </form> */}
            </div>
        )
    }

