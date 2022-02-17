import './login.css'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Login(){

  return(
      <Popup trigger={<button> Log in</button>} position="right center">
  <div>
    <input type="text" placeholder="username"></input>
    <input type="password" placeholder='password'></input>
    <span><a href='http://localhost:3000/'>Forgot your password?</a></span>
    <button>LOG IN</button>
  </div>
</Popup>
  )
} 
