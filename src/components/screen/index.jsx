import React, { useEffect, useRef, useState } from "react";
import "./screen.css";
import userImg from "../../images/perfilmessage.png";
import sendImg from "../../images/send.svg";
import backImg from "../../images/back.svg";
import { Link } from "react-router-dom";

const message = [
  { time: "10:01", user: "j", msg: "rrra" },
  { time: "10:01", user: "a", msg: "aa" },
  { time: "10:01", user: "j", msg: "arrrr" },
  { time: "10:01", user: "j", msg: "rrra" },
  { time: "10:01", user: "a", msg: "aaaaaaaaaa" },
  { time: "10:01", user: "j", msg: "arrra" },
  { time: "10:01", user: "j", msg: "arrrrra" },
  { time: "10:01", user: "a", msg: "aa" },
  { time: "10:01", user: "a", msg: "aa" },
  { time: "10:01", user: "j", msg: "rrrrrrrrrr" },
  { time: "10:01", user: "a", msg: "aa" },
  { time: "10:01", user: "j", msg: "arrrrrrrrrrrrr" },
];
const username = "Username";

export default Screen = () => {
  const [msg, setMsg] = useState();
  const [chat, setChat] = useState(message);
  const messagesEnd = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.trim() != "") {
      console.log("submited");
      setChat((prevChat) => [...prevChat, { user: "a", msg }]);
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
        {chat.map(({ user, msg, time }, i, array) => {
          let tagClass = "left";
          const next = array[i + 1]?.user;

          if (user == "a") tagClass = "rigth";
          if (user == next) tagClass += " head-msg";

          return (
            <p key={`msg-${i}`} className={tagClass}>
              {msg} <span>{time}</span>
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
