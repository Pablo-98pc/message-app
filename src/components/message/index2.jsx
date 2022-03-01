import './message.css'
import Subheader from './subheader';
import Main from './main';
import Subfooter from './subfooter';
import { useState, useEffect, createContext , useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import getData from '../helpers/getData';

export const Context = createContext(null);

export default function Message(type){
    const { id } = useParams();
    type = 'users';//esto no se como pasarlo, si por props, por context o por link
    const [mydata, setMyData] = useState([]);

/*     const setData = useCallback(() => {
         getData(id,type)
            .then ((newData) => {
                setMyData(newData.data);
            })
    },[id,type]); */
    
    const setData = () => {
         getData(id,type)
            .then ((newData) => {
                setMyData(newData.data);
            })
    };
//si yo lo que tendría que pedir serían los mensajes?????????? o no.
    useEffect(() => {
        setData();
    }, [/* id,myurl */])
   //condicionar el renderizado a mydata, si es null, no renderizar
    console.log(mydata);
    if (mydata.length === 0) {
      return(
          <h1>charging</h1>
      );
    }
    else {
        console.log(mydata);
        return(
            <Context.Provider value={mydata}>
                <div className='main'>
                    <Subheader element={type}/>
                    <Main />
                    <Subfooter />
                </div>            
            </Context.Provider>
        )        
    }
}