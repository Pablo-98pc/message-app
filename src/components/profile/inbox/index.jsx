import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";


export default function Inbox() {
    const [messages,setMessages] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        async function FetchData(){
            try {
            const resp = await axios.get(`http://localhost:3001/api/messages/withuser/${id}`);
            let data = resp.data
            console.log(data[1])
            setMessages(data[1])
            }
            catch(err){
                console.log(err)
            }
            
        }
        FetchData()
        

    },[id])
    return <div className="card bg-light mb-3"style={{maxWidth: "40%",position:"inherit"}} >
    <div className="card-header text-center" >
        Last Messages
    </div>
      {messages.map((message,index)=> <div className="card-body"key={index}> <Link to={`/conversation/${message.id}`} ><p className="card-text" >{message.subject}</p></Link>  </div>)} 
  </div>
     
}