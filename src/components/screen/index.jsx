import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import "./screen.css";

import userImg from "../../images/perfilmessage.png";
import sendImg from "../../images/send.svg";
import backImg from "../../images/back.svg";

import postNewMessage from "../helpers/postNewMessage";

export default Screen = ({ message }) => {
  // const { conversation: messages } = message || gg;
  // const { name: username } = message || gg;
  // const { userid } = message || gg;
  // const ownid = useContext(Context)?.id || 12;
  // let userid;
  // messages[0].from_user == ownid
  //   ? (userid = messages[0].to_user)
  //   : (userid = messages[0].from_user);
  // console.log(userid);

  const { conversation: messages } = message;
  const { name: username } = message;
  const { userid } = message;
  const ownid = useContext(Context)?.id;

  const [msg, setMsg] = useState();
  const [chat, setChat] = useState(messages);
  const messagesEnd = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msg.trim() !== "") {
      // Send to socket
      // test ========================================
      // setChat((prevChat) => [
      //   ...prevChat,
      //   {
      //     to_user: 10,
      //     from_user: userid,
      //     date: new Date().toString(),
      //     text: msg,
      //   },
      // ]);
      //================================================
      let bodytosend = {
        groupmessage: false,
        text: msg,
        //(!) subject: subject.current.value,
        from_user: ownid,
        to_user: userid,
        date: new Date(),
      };
      console.log("bodytosend", bodytosend);
      await postNewMessage(bodytosend, "user").then((newData) => {
        console.log(newData);
      });
      setMsg("");
    }
  };

  useEffect(() => scrollToBottom(), []);
  useEffect(() => scrollToBottom("smooth"), [chat]);
  const scrollToBottom = (behavior) => {
    messagesEnd.current.scrollIntoView({ behavior });
  };

  return (
    <section className="screen-container">
      <nav className="screen-nav">
        <Link to={"/"} className="screen-back">
          <img src={backImg} alt="" />
        </Link>
        <p className="screen-username">{username}</p>
        <img src={userImg} alt="" className="screen-img" />
      </nav>
      <div className="screen-msg">
        {chat.map(({ from_user, text, date }, i, array) => {
          let tagClass = "left";
          const next = array[i + 1]?.from_user;

          if (from_user === ownid) tagClass = "rigth";
          if (from_user === next) tagClass += " head-msg";

          return (
            <p key={`msg-${i}`} className={tagClass}>
              {text} <span>{date.split("T")[1].substring(0, 5)}</span>
            </p>
          );
        })}

        <div className="scroll-bottom" ref={messagesEnd} />
      </div>
      <form onSubmit={handleSubmit} className="screen-form" action="">
        <input
          type="text"
          className="screen-input"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button href="" className="screen-send">
          <img src={sendImg} alt="" />
        </button>
      </form>
    </section>
  );
};
