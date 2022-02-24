import './message.css'
import Subheader from './subheader';
import Main from './main';
import Subfooter from './subfooter';
import { useState, useEffect, createContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const Context = createContext(null);

export default function Message(type){
    const { id } = useParams();
    type = 'user';//esto no se como pasarlo, si por props, por context o por link
    console.log(id);
    let urlprueba = `http://localhost:3001/api/users/1`;
    console.log(urlprueba);
    const [mydata, setMyData] = useState(null);
    const [myurl, setMyUrl] = useState(urlprueba);

    async function geturl() { /* tiene que ir a un helper */ /* minimo fuera del useEffect */
        switch (type) {
        case 'user':
            await setMyUrl(`http://localhost:3001/api/users/${id}`);
            break;
         case 'group':
            await setMyUrl(`http://localhost:3001/api/groups/${id}`);
            break;
        default:
            console.log('error');
    }
    }    
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
    
    useEffect(async () => {
        await geturl();
        async function fetchApi() {
            try {
              let response = await axios.get(myurl);
              setMyData(response.data);
              
            } catch (err) {
              console.log(err);
            }
          }
        await fetchApi();
    }, [/* id,myurl */])

    console.log(mydata);
    return(
        <Context.Provider values={{mydata, setMyData}}>
            <div className='main'>
                <Subheader />
                <Main />
                <Subfooter />
            </div>            
        </Context.Provider>
    )
}