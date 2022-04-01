import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import "./screen.css";

import userImg from "../../images/perfilmessage.png";
import sendImg from "../../images/send.svg";
import backImg from "../../images/back.svg";

import postNewMessage from "../helpers/postNewMessage";

export default Screen = ({ message, setMessage, indexM, z }) => {
  //console.log("mensaje", indexM);
  console.log("MEDDDASDASDFASD", message[indexM]);
  const { zIndex, setZIndex } = z;
  const { conversation: messages } = message[indexM];
  const { name: username } = message[indexM];
  const { userid } = message[indexM];
  const ownid = useContext(Context)?.id;

  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(messages);
  const messagesEnd = useRef(null);
  useEffect(() => {
    setChat(messages);
  }, [indexM, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempDate = new Date();
    tempDate.setHours(tempDate.getHours() - 2);
    if (msg.trim() !== "") {
      const newMsg = {
        to_user: userid,
        from_user: ownid,
        date: tempDate.toISOString(),
        text: msg,
      };
      // setChat((prevChat) => [...prevChat, newMsg]);

      // Send to socket
      let bodytosend = {
        groupmessage: false,
        text: msg,
        from_user: ownid,
        to_user: userid,
        date: new Date(),
      };

      console.log("MMMMSDSDFM", newMsg.date);
      await postNewMessage(bodytosend, "user");
      setMsg("");
      let tempState = [...message];
      tempState[indexM].conversation.push(newMsg);
      setMessage(tempState);
    }
  };

  useEffect(() => scrollToBottom(), []);
  useEffect(() => scrollToBottom("smooth"), [message]);
  const scrollToBottom = (behavior) => {
    messagesEnd.current.scrollIntoView({ behavior });
  };

  return (
    <section className="screen-container" style={zIndex}>
      <nav className="screen-nav">
        <Link
          to={"/"}
          className="screen-back"
          onClick={() => setZIndex({ zIndex: -10 })}
        >
          <img src={backImg} alt="" />
        </Link>
        <p className="screen-username">{username}</p>
        <img src={userImg} alt="" className="screen-img" />
      </nav>
      <div>
        <div className="screen-msg">
          {chat.map(({ from_user, text, date }, i, array) => {
            let tagClass = "left";
            const next = array[i + 1]?.from_user;
            let h = new Date(date);
            h.setHours(h.getHours() + 2);
            date = h.toTimeString().slice(0, 5);

            if (from_user === ownid) tagClass = "rigth";
            if (from_user === next) tagClass += " head-msg";

            return (
              <p key={`msg-${i}`} className={tagClass}>
                {text} <span>{date}</span>
              </p>
            );
          })}

          <div className="scroll-bottom" ref={messagesEnd} />
        </div>
        <form onSubmit={handleSubmit} className="screen-form" action="">
          <input
            autoFocus
            type="text"
            className="screen-input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button href="" className="screen-send">
            <img src={sendImg} alt="" />
          </button>
        </form>
      </div>
    </section>
  );
};
