import './404.css'
import {Context} from '../../App';
import { useContext} from 'react';

export default function PageNotFound () {
    const data =  useContext(Context);
    return(
        <div className='main'>
            <h1>Page Not Found</h1>
            <h2>{data.username}</h2>
        </div>
    )
}