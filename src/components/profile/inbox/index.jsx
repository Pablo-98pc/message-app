import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";


export default function Inbox() {
    const [messages,setMessages] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    const {id} = useParams();
    useEffect(()=>{
        async function FetchData(){
            try {
            const resp = await axios.get(`http://localhost:3001/api/messages/withuser/${id}`);
            let data = resp.data
            console.log(data[1])
            setMessages(data[1])
            setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
            
        }
        FetchData()
        

    },[id])
    return <div className="card bg-light mb-3"style={{maxWidth: "40%",position:"inherit",margin:'auto',maxHeight:'70%'}} >
    <div className="card-header text-center" >
        Last Messages
    </div>
    {isLoading ? <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div> : 
      messages.map((message,index)=> <div className="card-body"key={index}> <Link to={`messages/message/${message.id}`} ><p className="card-text" >{message.subject}</p></Link>  </div>) }
  </div>
     
}