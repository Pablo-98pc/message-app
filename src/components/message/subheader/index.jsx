/* import './message.css' */
import { useState , useContext} from 'react';

export default function Subheader(){
    return(
        <div className='subheader'>
            {/* <img src={data.avatar} alt = 'avatar'/>
            {data.id} */}
            <h1>subheader</h1>
        </div>
    )
}
//hacer petición a messages para to y from con el userid o el groupid