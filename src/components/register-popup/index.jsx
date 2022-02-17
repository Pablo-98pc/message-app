import './register.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Register(){

    return(
        <Popup  trigger={<button> Register</button>} position="right center">
         <div>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="name"></input>
            <input type="text" placeholder="surname"></input>
            <input type="text" placeholder='email'></input>
            <input type="password" placeholder='password'></input>  
            <button>REGISTER</button>          
        </div>
        </Popup>
    )
} 
