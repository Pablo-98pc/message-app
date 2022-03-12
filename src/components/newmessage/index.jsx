import './newmessage.css'
import { useRef, useContext } from 'react';
import postNewMessage from '../helpers/postNewMessage';
import {Context} from '../../App';

export default function NewMessage(){

    const data =  useContext(Context); //logged user data
    const type = 'user';
    const subject = useRef();
    const message = useRef();
    const receiver = useRef();



    const handleAnswer = async (event) => {
        let bodytosend = {groupmessage:false,text: message.current.value, subject: subject.current.value, 
            from_user: data.id, to_user: parseInt(receiver.current.value), date:new Date()};
        console.log(bodytosend);
        await postNewMessage(bodytosend,type) 
            .then ((newData) => {
                console.log(newData);
            })
        message.current.value = "";
        subject.current.value = "";
        receiver.current.value = "";
    }


          return(
            <div className='main'>
                <div class="new-message">
                    <div className='form-header'>
                        <input type="text" placeholder="subject" ref ={subject} name ='subject'/>
                        <input type="text" placeholder="to" name ='touser' ref ={receiver} required/>
                    </div>
                    <div className='form-message'>
                        <textarea id ="textinput" type="text" maxLength="300" placeholder="Text" name ="message" ref ={message} required/>
                    </div>
                    <div className='form-button'>
                        <button onClick={handleAnswer}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

