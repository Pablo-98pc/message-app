import './login.css'
import React , { useState , useEffect, useCallback, createContext } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import getProfileByUsername from '../../helpers/getProfileByUsername';




export default function Login(){
  const [passwordShown, setPasswordShown] = useState(false)
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [logged, setLogged] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const getData = () => {
    getProfileByUsername(username)
       .then ((newData) => {
           setUser(newData.data);
       })
  };
  //ahora mismo al dar al boton login, cambiaria el estado del user, y el useEffect habria que vincularlo
  //a ese estado, así solo entraria si hay datos en el usuario, ahi es cuando deberíamos hacer la comprobación del password, que ya está en el estado deberíamos
  //lo ideal sería hacerlo en un helper, 
 

  const checkPassword = () => {
    if (password === user.password) {
      setLogged(!logged);//esto se podría usar para hacer un renderizado condicional
      //el usuario ha introducido la contraseña correcta
      console.log('contraseña correcta');
    }
  };

 /*  useEffect (()=> {
    checkPassword()
  }, [user]);
 */
 

/*   useEffect(() => { */

    //Aqui pasamos los datos del helper que recoja los datos de User
    
/*     function checkUserData(){
      let userInfo = JSON.parse(window.localStorage.getItem("userinfo"));
      if(userInfo!=null){
        setUse(userInfo);
      }
    }

    fetchApi();
    checkUserData();
  }, []);
  */

  return(
      <Popup trigger={<button> Log in</button>} position="right center">
  <div>
    <input id="username" type="text" placeholder="username" onChange={event => setUsername(event.target.value)}></input>
    <input type={passwordShown ? "text" : "password"} placeholder='password' onChange={event => setPassword(event.target.value)}></input>
    <button onClick={togglePassword}>Show Password</button>
    <span><a href='http://localhost:3000/%27%3E'>Forgot your password?</a></span>
    <button onClick={getData}>LOG IN</button>
  </div>
</Popup>
  )
}