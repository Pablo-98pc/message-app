import React , { useState , useRef, useEffect, createContext, useCallback} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './app.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import image from './image.jpg';
import Profile from './components/profile/index';
import Conversation from './components/conversation';
import Message from './components/message';
import PageNotFound from './components/404';
import getProfileByUsername from './components/helpers/getProfileByUsername';
import postNewUser from './components/helpers/postNewUser';
export const Context = createContext(null);

export default function App(){
    const [passwordShown, setPasswordShown] = useState(false)
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [newUser, setNewuser] = useState(false);

    const userprueba = useRef();
    const bodyusername = useRef();
    const bodylastname = useRef();
    const bodyfirstname = useRef();
    const bodyemail = useRef();
    const bodypassword = useRef();

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const getData= useCallback(async () => {
        let usertosearch = userprueba.current.value;
        await getProfileByUsername(usertosearch)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(false);
        })
    },[user]);

    const postData= useCallback(async () => {
        let body = {username: bodyusername.current.value, last_name: bodylastname.current.value, 
            first_name: bodyfirstname.current.value, email: bodyemail.current.value, password: bodypassword.current.value};
        await postNewUser(body)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(true);

        })
    },[user]);

    const checkPassword = () => {
        console.log('dentro de checkPassword');
        if (password === user.password || newUser) {
        console.log('contraseña correcta');
        setLogged(!logged);//como controlo si aquí llega del login o del register???
        //el usuario ha introducido la contraseña correcta
        }
    };

    useEffect (()=> {
        if (user) {
        checkPassword();
        }
    }, [user,newUser]);

    return(<> 
        {!logged? 
            <div className='welcome'>
                <div className='welcome-info'>
                    <h1>Welcome</h1>
                    <div className='buttons'>
                    <Popup trigger={<button> Log in</button>} position="right center">
                        <div>
                            <input id="username" ref= {userprueba} type="text" placeholder="username" onChange={(async(event) => await setUsername(event.target.value))}></input>
                            <input type={passwordShown ? "text" : "password"} placeholder='password' onChange={event => setPassword(event.target.value)}></input>
                            <button onClick={togglePassword}>Show Password</button>
                            <span><a href='http://localhost:3000/%27%3E'>Forgot your password?</a></span>
                            <button onClick={getData}>LOG IN</button>
                        </div>
                    </Popup>
                    <Popup  trigger={<button> Register</button>} position="right center">
                        <div>
                            <input type="text" ref= {bodyusername} placeholder="username"></input>
                            <input type="text" ref= {bodyfirstname} placeholder="name"></input>
                            <input type="text" ref= {bodylastname} placeholder="surname"></input>
                            <input type="text" ref= {bodyemail} placeholder='email'></input>
                            <input type={passwordShown ? "text" : "password"} ref= {bodypassword} placeholder='password'></input>
                            <button onClick={togglePassword}>Show Password</button>
                            <button onClick={postData}>REGISTER</button>
                        </div>
                    </Popup>
                    </div>    
                </div>  
                <div className='welcome-photo'>
                    <img src={image} alt={image} className='image'></img>
                </div>      
            </div>
        :
            <Context.Provider value={user}>
                <Router>
                    {/* <Header/> */}
                    <Routes >
                    {/* <Route path="/" element={<Welcome/>} /> */}
                    <Route exact path="/" element={<Profile />} />
                    <Route path="/conversation/:type/:id" element={<Conversation />} />
                    <Route path="/message/:id" element={<Message/>} />
                    <Route path="*" element={<PageNotFound />} />
                    {/* <Route path="*">
                        <Redirect to="/404" />
                    </Route> */}
                    </Routes>
                </Router>
            <h1>logeado</h1>
            </Context.Provider>
        }
        </>
    )
    }
 



