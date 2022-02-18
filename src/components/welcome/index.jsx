import './welcome.css';
import image from './image.jpg'
import Login from './login-popup/index';
import Register from './register-popup/index'

export default function Welcome(){
    

    return(
        <div className='welcome'>
            <div className='welcome-info'>
                <h1>Welcome</h1>
                <div className='buttons'>
                    <Login/>
                    <Register />
                </div>    
            </div>  
            <div className='welcome-photo'>
                <img src={image} alt={image} className='image'></img>
            </div>      
        </div>
    )
}