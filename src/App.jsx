import React , { useState , useRef, useEffect, createContext, useCallback} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './app.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import image from './image.jpg';
import Header from './components/header'
import Profile from './components/profile/index';
import Conversation from './components/conversation';
import Message from './components/message';
import NewMessage from './components/newmessage';
import PageNotFound from './components/404';
import getProfileByUsernameLogin from './components/helpers/getProfileByUsernameLogin';
import postNewUser from './components/helpers/postNewUser';
export const Context = createContext(null);

export default function App(){
    const [passwordShown, setPasswordShown] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [newUser, setNewuser] = useState(false);

    const userprueba = useRef();
    const bodyusername = useRef();
    const bodylastname = useRef();
    const bodyfirstname = useRef();
    const bodyemail = useRef();
    const bodypassword = useRef();
    const passwordlogin = useRef();

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const getData= useCallback(async () => {
        let usertosearch = userprueba.current.value;
        let passwordtocheck = passwordlogin.current.value;
        await getProfileByUsernameLogin(usertosearch, passwordtocheck)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(false);
            console.log(user);
            setLogged(true);
            window.localStorage.setItem('userlogged',JSON.stringify({...newData.data}));  

        })
    },[user]);
/*     const getData= useCallback(async () => {
        let usertosearch = userprueba.current.value;
        await getProfileByUsername(usertosearch)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(false);
            console.log(user);
        })
    },[user]); */

/*     window.localStorage.setItem(
        'userlogged',JSON.stringify(user)
    )

 esto seria para guardar en localstorage y para recuperarlo luego*/

    /* const getData= ((event) => {
        event.preventDefault();
        console.log(event);
         getProfileByUsername(username)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(false);
        })
    },[user]); */

    const postData= useCallback(async () => {
        let body = {username: bodyusername.current.value, last_name: bodylastname.current.value, 
            first_name: bodyfirstname.current.value, email: bodyemail.current.value, password: bodypassword.current.value};
        await postNewUser(body)
            .then ((newData) => {
            setUser({...newData.data});
            setNewuser(true);
            setLogged(true);
            window.localStorage.setItem('userlogged',JSON.stringify(...newData.data));  
        })
    },[user]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('userlogged');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            setLogged(true);
        }            
    }, [user])
/*     const checkPassword = () => {
        console.log('dentro de checkPassword');
        if (password === user.password || newUser) {
        console.log('contraseña correcta');
        setLogged(!logged);
        }
    }; 

    useEffect (()=> {
        if (user) {
        checkPassword();
        }
    }, [user,newUser]); */

    return(<> 
        {!logged? 
            <div className='welcome'>
                <div className='welcome-info'>
                    <h1>Welcome</h1>
                    <div className='buttons'>
                    <Popup trigger={<button> Log in</button>} position="right center">
{/*                         <form onSubmit={getData}>
                            <input id="username" ref= {userprueba} value={username} type="text" placeholder="username" 
                            onChange={({event}) => setUsername(event.target.value)}></input>
                            <input type={passwordShown ? "text" : "password"} placeholder='password' value={password}
                            onChange={({event}) => setPassword(event.target.value)}></input>
                            <button onClick={togglePassword}>Show Password</button>
                            <span><a href='http://localhost:3000/%27%3E'>Forgot your password?</a></span>
                            <button type="submit">LOG IN</button>
                        </form> */}
                        <div>
                            <input id="username" ref= {userprueba} type="text" placeholder="username" onChange={(async(event) => await setUsername(event.target.value))}></input>
                            <input type={passwordShown ? "text" : "password"} placeholder='password' ref={passwordlogin} onChange={event => setPassword(event.target.value)}></input>
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
                    <Header/>
                    <Routes >
                    <Route exact path="/" element={<Profile />} />
                    <Route path="/conversation/:type/:id" element={<Conversation />} />
                    <Route path="/message/:id" element={<Message/>} />
                    <Route path="/newmessage" element={<NewMessage/>} />
                    <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </Context.Provider>
        }
        </>
    )
    }
 



