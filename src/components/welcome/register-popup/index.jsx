import './register.css'
import Popup from 'reactjs-popup';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';

export default function Register(){
    const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }


    return(
        <Popup  trigger={<button> Register</button>} position="right center">
         <div>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="name"></input>
            <input type="text" placeholder="surname"></input>
            <input type="text" placeholder='email'></input>
            <input type={passwordShown ? "text" : "password"} placeholder='password'></input>
            <button onClick={togglePassword}>Show Password</button>
            <button>REGISTER</button>
        </div>
        </Popup>
    )
}
