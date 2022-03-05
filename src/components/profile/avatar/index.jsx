import './avatar.css'
import { useEffect, useState } from 'react'
/* import Swal from 'sweetalert2' */
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import axios from 'axios';
import { useParams } from 'react-router-dom'



export default function Avatar () {
    const {id} = useParams();
    const [userName,setUserName] = useState(undefined) 
    const [isMenuOpened,setIsMenuOpened] = useState(false)
    const [isLoading,setIsLoading] = useState(true);

     useEffect(()=> {
        async function FetchData(){
            try {
            const resp = await axios.get(`http://localhost:3001/api/users/profile/${id}`);
            let data = resp.data
            setUserName(data.nick);
            setIsLoading(false);
            }
            catch(err){
                console.log(err)
            }
            
        }
        FetchData()


    },[userName,id]) 


  /* Pop-up menu to set description of user through sweetalert library*/
   /*   const handleSetDescription= () => {Swal.fire( {
        title: 'Enter your description',
        input:"text",
        inputLabel:'Your description',
        inputValidator : (value) => {
            if(value.length > 150){
                return 'max 150 characters'
            } else if(value === ''){
                return 'set a description'
            }
        }
    }).then((result)=>{
            if(result.value !== undefined)
            setDescription(result.value);
        }
    )}       */
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
         <img className='perfilImg' src='https://cdn-icons.flaticon.com/png/128/3736/premium/3736502.png?token=exp=1645566551~hmac=f3d182445ba0fb59eb6828592161c149' onClick={handleMenu}></img>
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
        </div> : <><h1>{userName}</h1><div className="description">
                {/* {description} <button  onClick={handleSetDescription}>edit</button> */}
            </div><button onClick={handleMenu}>Cerrar</button></> }
             </div>
    </div> 
        </OffCanvasMenu>
        
      </OffCanvas>
      </div>)
    
   
    }