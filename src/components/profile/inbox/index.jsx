import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";

import "./inbox.css";

import { Icon } from "@iconify/react";


export default function Inbox({conversations,isLoading,setCurrentMessage}) {
    
   const [messages,setMessages] = useState(conversations);

   useEffect(() => {
      setMessages(conversations)
   }, [conversations]);

    return (
    <>
      <div className="card">
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          messages?.map((message, index) => (
            <div className="card-body" key={index}>
              <div className="card-flex">
                <div className="card-container-pic">
                  <img src="" alt="" />
                </div>
                <div className="card-text" onClick={() => setCurrentMessage(message)}>
                  <p className="card-name">{message.name}</p>
                  <p className="card-last-messsage-text">
                    {message.conversation[0].text.length > 20
                      ? message.conversation[0].text.slice(0, 20) + " ..."
                      : message.conversation[0].text}
                  </p>
                </div>
              </div>
              <div>
                <Icon
                  className="card-arrow-right"
                  icon="akar-icons:chevron-right"
                ></Icon>
                <p>{new Date(message.date).toTimeString().slice(0, 5)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
