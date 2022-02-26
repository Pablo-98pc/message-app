import './message.css'
import Subheader from './subheader';
import Main from './main';
import Subfooter from './subfooter';
import { useState, useEffect, createContext , useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import getData from './helpers/getData';

export const Context = createContext(null);

export default function Message(type){
    const { id } = useParams();
    type = 'users';//esto no se como pasarlo, si por props, por context o por link
    let urlprueba = `http://localhost:3001/api/users/1`;
    const [mydata, setMyData] = useState(null);
    const [myurl, setMyUrl] = useState(urlprueba);
    const [charged, setCharged] = useState(false);
//tengo qu e tener el id del usuario logeado, el cual debería estar en el context, por params recibo el otro, o en lugar de recibirlo por paremas
//podría recibirlo por props, junto con el tipo 
/*     function geturl() { 
        switch (type) {
        case 'user':
            setMyUrl(`http://localhost:3001/api/users/${id}`);
            break;
         case 'group':
            await setMyUrl(`http://localhost:3001/api/groups/${id}`);
            break;
        default:
            console.log('error');
    } 
    }     */
/*     async function geturl() {
        await setMyUrl(`http://localhost:3001/api/${type}/${id}`); 
    } */
    /*     async function fetchApi() {
        console.log(myurl);
        await fetch (myurl,{
            method: "GET",
            mode:"no-cors",
            referrer:"no-referrer",
            headers: { 'Content-Type': 'application/json','cors':'no-cors'  }
        })
        .then((resp => resp.json()))
        .then(function (data) {
            setMyData(data.results);
            console.log(data.results);
        })
        .catch(function (err) {
            console.log(err);
        })
    } */
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

    useEffect(() => {
        
        
/*         async function fetchApi() {
            try {
              let response = await axios.get(myurl);
              setMyData(response.data);
              console.log('dentro del try');
            } catch (err) {
              console.log(err);
            }
          } */
        /* geturl();   */
        setData();
        /* fetchApi(); */
    }, [/* id,myurl */])
   //condicionar el renderizado a mydata, si es null, no renderizar
    console.log(mydata);
    if (mydata !== null) {
      setCharged(true);
    }
    else {
        return(
            charged && <Context.Provider values={{mydata, setMyData}}>
                <div className='main'>
                    <Subheader />
                    <Main />
                    <Subfooter />
                </div>            
            </Context.Provider>
        )        
    }

}