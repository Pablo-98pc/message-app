import { useEffect, useState, useContext, useCallback } from "react";
import "./inbox.css";
import Card from "./card";
export default function Inbox({
  conversations,
  isLoading,
  setCurrentMessage,
  setMessagesP,
  newMessage,
  setNewMessage,
}) {
  const [messages, setMessages] = useState(conversations);
  const [isNewMessage, setIsNewMessage] = useState(newMessage);
 

  useEffect(() => {
    setMessages(conversations);
    setIsNewMessage(newMessage);
  }, [conversations, newMessage]);

  return (
    <>
      <div className="card">
        {isNewMessage ? (
          <Card
            typeCard={false}
            messages={messages}
            setCurrentMessage={setCurrentMessage}
            setMessages={setMessagesP}
            setIsNewMessage={setNewMessage}
          />
        ) : (
          ""
        )}
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          messages?.map((message, index) => (
            <Card
              key={index}
              typeCard={true}
              setCurrentMessage={setCurrentMessage}
              index={index}
              message={message}
              setIsNewMessage={setNewMessage}
            />
          ))
        )}
      </div>
    </>
  );
}
