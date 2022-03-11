import { useEffect, useState , useContext} from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import {Context} from '../../../App';
import './inbox.css'
 
export default function Inbox() {
    const [messages,setMessages] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const dataprueba = useContext(Context);

    useEffect(()=>{
        async function FetchData(){
            try {
            const resp = await axios.get(`http://localhost:3001/api/messages/withuser/${dataprueba.id}`);
            let data = resp.data
            console.log(data.rows)
            setMessages(data.rows)
            setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
            
        }
        FetchData()
        

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
      messages.map((message,index)=> <div className="card-body"key={index}> <Link to={`message/${message.id}`} ><p className="card-text" >subject : {message.subject}</p></Link>  </div>) }
   
  </div>
    <div className="messageButton"><Link to={`/newmessage`}><button>New Message</button></Link></div></>
}