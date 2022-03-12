import './profile.css'
import Avatar from './avatar/index'
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Inbox from './inbox';




export default function Profile(){
    return<>
            <Avatar/>
            <div className='inbox'>
            <Inbox/>
            </div>
        </>
    
}