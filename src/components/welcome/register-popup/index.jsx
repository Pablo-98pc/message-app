import './register.css'
import Popup from 'reactjs-popup';
import { useState, useRef } from 'react';
import 'reactjs-popup/dist/index.css';
import bcrypt from 'bcryptjs'



const salt = bcrypt.genSaltSync(10)

export default function Register(){
    const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
 
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  function handleLoginForm() {
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    console.log(hashedPassword)
  


    fetch("databaseprueba", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    })
  }

   
    return(
        <Popup  trigger={<button> Register</button>} position="right center">
         <div>
           <form>

           </form>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="name"></input>
            <input type="text" placeholder="surname"></input>
            <input type="text" ref={emailInputRef} placeholder='email'></input>
            <input type={passwordShown ? "text" : "password"} ref={passwordInputRef} placeholder='password'></input>
            <button onClick={togglePassword}>Show Password</button>
            <button type='submit' 
                    onClick={e =>{
                      e.preventDefault()
                      handleLoginForm()
                      
                      }}>REGISTER</button>
            <span>Your new SALT: {salt}</span>
            <span>
          Save this Salt, UPON sign up <br /> if you refresh it will generate a new SALT!!!
        </span>
        </div>
        </Popup>
    )
}
