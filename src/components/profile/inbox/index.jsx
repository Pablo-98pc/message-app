import { useEffect, useState , useContext , useCallback} from "react"
import { Link } from "react-router-dom";
import {Context} from '../../../App';
import './inbox.css'
import getMessages from '../../helpers/getMessages';
 
export default function Inbox() {
    const [messages,setMessages] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const dataprueba = useContext(Context);

    const idfortest = dataprueba.id;
    const getmessage= useCallback( async () => {
        await getMessages(idfortest,'users')
           .then ((newData) => {
               setMessages(newData.data.rows);
               setIsLoading(false)
       })
   },[idfortest]);


    useEffect(()=>{
        getmessage()
        

    },[dataprueba])
    return <><div className="card"style={{maxWidth: "40%",position:"inherit",margin:'auto',maxHeight:'70%'}} >
    <div className="card-header" >
        Last Messages
    </div>
    {isLoading ? <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div> : 
      messages.map((message,index)=> 
      <div className="card-body"key={index}> <Link to={`message/${message.id}`}>
          <p className="card-text" >subject : {message.subject}</p></Link>  </div>) }
   
  </div>
    <div className="messageButton"><Link to={`/newmessage`}><button>New Message</button></Link></div></>
}