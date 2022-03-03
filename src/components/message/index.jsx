import './message.css'
import Subheader from './subheader';
import SingleMessage from './singleMessage';
import {
    BrowserRouter as Router,
    Routes, Route, Redirect
  } from "react-router-dom";
import Main from './main';
/* import Subfooter from './singleMessage'; */
import { useState, useEffect, createContext , useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getData from '../helpers/getData';
import getMessages from'../helpers/getMessages';
import getMessagesBetween from'../helpers/getMessagesBetween';

import PageNotFound from '../404/index';

export const Context = createContext(null);
export const Conversation = createContext(null);

export default function Message(type){
    /* const { id } = useParams(); */
    const  id  = 1;
    type = 'users';//esto no se como pasarlo, si por props, por context o por link
    const [mydata, setMyData] = useState([]);
    const [mydataMessages, setMyDataMessages] = useState([]);

    const setData = useCallback(() => {
         getData(id,type)
            .then ((newData) => {
                setMyData(newData.data);
            })
    },[id,type]);
    const userLogged = 2;
    console.log(id);
    const setMessages = () => {
         getMessagesBetween(id,userLogged,type)
            .then ((newData) => {
                setMyDataMessages(newData.data.rows);
            })
    };
//si yo lo que tendría que pedir serían los mensajes?????????? o no.
    useEffect(() => {
        setMessages();
        setData();
    }, [id])
   //condicionar el renderizado a mydata, si es null, no renderizar
    console.log(mydata);
    if (mydata.length === 0) {
        console.log(mydata);
      return(
          <h1>charging</h1>
      );
    }
    else {
        console.log(mydata);
        console.log(mydataMessages);
        return(
            <Context.Provider value={mydataMessages}>
            <Conversation.Provider value={ mydata}>
                <Routes>
                    {/* <Route exact path="/with/:id" component={<Subheader element={type,id}/>} /> */}
                    {/* <Route exact path="/message/:id" component={<SingleMessage element={type,id}/>} /> */}
                    <Route exact path="*" component={<PageNotFound/>} />
                    {/* <Route exact path="/categories" component={<Subheader element={type,id}/>} />
                    <Route exact path="/categories" component={<Subheader element={type,id}/>} /> */}
                    {/* <Route path="*">
                        <Redirect to="/404" />
                    </Route> */}
                </Routes>
                {/* <div className='main'>
                    <Subheader element={type,id}/>
                    <Main />
                    <Subfooter />
                </div>   */}        
{/*                     <Router>
                        <Routes >
                            <Route path="/" element={<h1>Hola</h1>} /> 
                            <Route path="/" element={<Subheader element={type,id}/>} />
                            
                        </Routes>
                    </Router> */}
            </Conversation.Provider>
            </Context.Provider>
        )        
    }       
} 
/*  ¿hago aquí un router a las distintas paginas, minimo la que muestra todos los mensajes(con rederizado condicionado por si hay mensajes o no), la que muestra el mensaje en particular y la de mensaje nuevo? */