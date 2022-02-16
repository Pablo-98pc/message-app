import './styles.css';
import Popup from 'reactjs-popup';
import image from './image.jpg'

export default function Welcome(){
    

    return(
        <div className='welcome'>
            <div className='welcome-info'>
                <h1>Welcome</h1>
                <div className='buttons'>
                    <Popup id="login" trigger={<button>Log In</button>} position="top left">
                        {close => (
                        <div>
                            <input type="text" placeholder='email' />
                            <input type="text" placeholder='password' />
                            <a href='https://www.google.com/'>Forgot your password?</a>
                            <button>Log In</button>  
                            <a className="close" onClick={close}>
                            &times;
                            </a>
                        </div>
                        )}
                    </Popup>
                    <Popup id="sign-in" trigger={<button>Sign In (not working yet)</button>} position="top right">
                        {close => (
                        <div>
                            <input type="text" placeholder='full name' />
                            <input type="text" placeholder='email' />
                            <input type="text" placeholder='password' />
                            <input type='checkbox'>Acepto la <a ref="https://www.google.com/">política de privacidad</a></input>
                            <button>Register</button>  
                            <a className="close" onClick={close}>
                            &times;
                            </a>
                        </div>
                        )}
                    </Popup>
                </div>    
            </div>  
            <div className='welcome-photo'>
                <img src={image} className='image'></img>
            </div>      
        </div>
    )
}