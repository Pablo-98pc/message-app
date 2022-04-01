import "./profile.css";
import Avatar from "./avatar/index";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Inbox from "./inbox";
import Screen from "../screen";
import Socket from "../../utils/Socket";
import foto from "../../images/edit.svg";
import getMessages from "../helpers/getMessages";
import getMessagesBetween from "../helpers/getMessagesBetween";
import { Context } from "../../App";

export default function Profile() {
  const dataprueba = useContext(Context);
  const [messages, setMessages] = useState([]);
  const idfortest = dataprueba.id;
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [newMessage,setNewMessage] = useState(false);

  const getmessage = useCallback(async () => {
    // params:user id
    // return : conversation id , name
    // I bring all the conversations in which the id user appears as sender or recipient
    const conversations = await getMessages(idfortest);

    // params:conversations id,name
    // return:conversations name, date, messages
    // fetch all the messages you have with each user you have a conversation with
    const conversationMessages = await Promise.all(
      conversations.data.map(async (item) => {
        const data = await getMessagesBetween(idfortest, item.id);

        const finalConversations = {
          userid: item.id,
          name: item.username,
          date: data.data.rows[data.data.rows.length - 1].date,
          conversation: data.data.rows,
        };
        return finalConversations;
      })
    );

    // order conversations for descending date
    const orderConversations = conversationMessages.sort(function (a, b) {
      const nameA = a.date;
      const nameB = b.date;
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });

    setMessages(orderConversations);
    setIsLoading(false);
  }, [idfortest, messages]);

  useEffect(() => {
    getmessage();
    setupSocket();
  }, [dataprueba]);

  //Function that prepares the websocket connection.
  const setupSocket = () => {
    //conexionSocket para definir id
    Socket.emit("connected", idfortest);
    Socket.on("news", async () => {
      console.log("Haz update.....");
      await getmessage();
    });
  };

  // console.log("current", messages);
  return (
    <div className="container-profile">
      <div className="left-side-inbox">
        <div className="header">
          <Avatar />
          <h2>Chats</h2>
          <div className="messageButton">
            <img alt="Profile pic" src={foto} onClick={()=>setNewMessage(true)}></img>
          </div>
        </div>
        <Inbox
          conversations={messages}
          isLoading={isLoading}
          setCurrentMessage={setCurrentMessage}
          setMessagesP={setMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}

        />
      </div>
      {currentMessage !== null ? (
        <Screen
          message={messages}
          setMessage={setMessages}
          indexM={currentMessage}
        />
      ) : null}
    </div>
  );
}
