import "./profile.css";
import Avatar from "./avatar/index";
import { Link } from "react-router-dom";
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Inbox from "./inbox";
import { Icon } from "@iconify/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import foto from "../../images/edit.svg";

export default function Profile() {
  return (
    <>
      <div className="header">
        <Avatar />
        <div className="messageButton">
          <Link to={`/newmessage`}>
            <img alt="Profile pic" src={foto}></img>
          </Link>
        </div>
      </div>
      <div className="inbox">
        <Inbox />
      </div>
    </>
  );
}
