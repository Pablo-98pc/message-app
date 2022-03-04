import React , { useState , useEffect, createContext, useCallback} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './app.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import image from './image.jpg';
import Profile from './components/profile/index';
import Message from './components/message';
import PageNotFound from './components/404';
import getProfileByUsername from './components/helpers/getProfileByUsername';
export const Context = createContext(null);

export default function App(){
    const [passwordShown, setPasswordShown] = useState(false)
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }
/*     async function ultimaprueba(a) {
        setUser({...a});
    }

    const handleUser = async(newUser) => {
        await ultimaprueba(newUser)
        .then (() => checkPassword());
    } */

    const getData= useCallback(async () => {
        await setUser(username);
        await getProfileByUsername(username)
            .then ((newData) => {
            console.log(newData.data);
            setUser({...newData.data});

        })
    },[user]);

    const checkPassword = () => {
        console.log('dentro de checkPassword');
        console.log(password);
        console.log(user.password);
        if (password === user.password) {
        console.log('contraseña correcta');
        setLogged(!logged);//esto se podría usar para hacer un renderizado condicional si
        //el usuario ha introducido la contraseña correcta
        }
    };

    useEffect (()=> {
        if (user) {

        checkPassword();
        }
    }, [user]);
    useEffect (()=> {
        console.log('log changed');
    }, [logged]);
    
    /* const handleUsername = useCallback(async (e) => {
        console.log(e);
        await (() => {
             setUsername(e);
        })
            
    }, [user]) */
    

    if (!logged) {
        return(<>
            <div className='welcome'>
                <div className='welcome-info'>
                    <h1>Welcome</h1>
                    <div className='buttons'>
                    <Popup trigger={<button> Log in</button>} position="right center">
                        <div>
                            <input id="username" type="text" placeholder="username" onChange={(async(event) => await setUsername(event.target.value))}></input>
                            <input type={passwordShown ? "text" : "password"} placeholder='password' onChange={event => setPassword(event.target.value)}></input>
                            <button onClick={togglePassword}>Show Password</button>
                            <span><a href='http://localhost:3000/%27%3E'>Forgot your password?</a></span>
                            <button onClick={getData}>LOG IN</button>
                        </div>
                    </Popup>
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
                    </div>    
                </div>  
                <div className='welcome-photo'>
                    <img src={image} alt={image} className='image'></img>
                </div>      
            </div>
        </>
        )
        
    } 
    else {
        return(<>
            <Context.Provider value={user}>
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
            <h1>logeado</h1>
            </Context.Provider>
        </>
        )
    }
    }
 



