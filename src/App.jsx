import React , { useState , useEffect, createContext } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Redirect
} from "react-router-dom";
import './index.css';
import Welcome from './components/welcome/index';
import Profile from './components/profile/index';
import Message from './components/message';
import PageNotFound from './components/404';
/* import Login from './components/login' */


/* const UserContext = createContext(null);
const [user, setUser] = useState(null) */

/* const userData = () =>{
  useEffect(() = >{
    
  }
} */

export default function App(){
    

        return(<>
              <Welcome />
           {/*  <div className='welcome'>
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
            </div> */}
            <Router>
                {/* <Header/> */}
                <Routes >
                {/* <Route path="/" element={<Welcome/>} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages/*" element={<Message />} />
                <Route path="*" element={<PageNotFound />} />
                {/* <Route path="*">
                    <Redirect to="/404" />
                </Route> */}
                </Routes>
            </Router>
        </>
        )
    }
 



