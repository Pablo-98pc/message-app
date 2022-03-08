import './avatar.css'
import { useEffect, useState , useContext } from 'react'
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import axios from 'axios';
import {Context} from '../../../App';


export default function Avatar () {
    const [userInfo,setUserInfo] = useState(undefined) 
    const [isMenuOpened,setIsMenuOpened] = useState(false)
    const [isLoading,setIsLoading] = useState(true);
    const datalogged = useContext(Context);
    
     useEffect(()=> {
        async function FetchData(){
            try {
            const resp = await axios.get(`http://localhost:3001/api/users/${datalogged.id}`);
            let user = resp.data
            setUserInfo(user);
            console.log(userInfo)
            setIsLoading(false);
            }
            catch(err){
                console.log(err)
            }
            
        }
        FetchData()


    },[datalogged.id]) 



    /* set the status of the profile menu*/
    const handleMenu = () => {
        setIsMenuOpened(!isMenuOpened)
        
    }
    return (<div>
        <OffCanvas
        width={300}
        transitionDuration={300}
        effect={"overlay"}
        isMenuOpened={isMenuOpened}
        position={"left"}
      >
        <OffCanvasBody
         
        >
         <img  alt='Profile pic' className='perfilImg' src='https://cdn-icons.flaticon.com/png/128/3736/premium/3736502.png?token=exp=1645566551~hmac=f3d182445ba0fb59eb6828592161c149' onClick={handleMenu}></img>
        </OffCanvasBody>
      
        <OffCanvasMenu className='card' style={{height:'100vh'}}>
        <div className="container bg-light" style={{height:'100vh'}}>
        <div className="profilePicture">
            <img src="" alt="imagen de perfil"></img>
        </div>
        <div className="avatarInfo">{isLoading ? <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div> : <><h1>{userInfo.username}</h1><p>{userInfo.email}</p><div className="description">
            </div><button onClick={handleMenu}>Cerrar</button></> }
             </div>
    </div> 
        </OffCanvasMenu>
        
      </OffCanvas>
      </div>)
    
   
    }