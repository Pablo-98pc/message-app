import "./profile.css";
import Avatar from "./avatar/index";
import { Link } from "react-router-dom";
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Inbox from "./inbox";

import foto from "../../images/edit.svg";

export default function Profile() {
  return (
    <div className="container-profile">
      <div className="header">
        <Avatar />
        <h2>Chats</h2>
        <div className="messageButton">
          <Link to={`/newmessage`}>
            <img alt="Profile pic" src={foto}></img>
          </Link>
        </div>
      </div>
      <div className="inbox">
        <Inbox />
      </div>
    </div>
  );
}
