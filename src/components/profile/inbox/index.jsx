import { useEffect, useState, useContext, useCallback } from "react";
import "./inbox.css";
import Card from "./card"
export default function Inbox({ conversations, isLoading, setCurrentMessage }) {
  const [messages, setMessages] = useState(conversations);

  useEffect(() => {
    setMessages(conversations);
  }, [conversations]);

  return (
    <>
      <div className="card">
      <Card typeCard={false}  setCurrentMessage={setCurrentMessage}/>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          messages?.map((message, index) => <Card key={index} typeCard={true} setCurrentMessage={setCurrentMessage} index={index} message={message} />)
        )}
        
      </div>
    </>
  );
}
