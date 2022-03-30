import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../App";
import "./inbox.css";
import getMessages from "../../helpers/getMessages";
import getMessagesBetween from "../../helpers/getMessagesBetween";
import { Icon } from "@iconify/react";
import Socket from "../../../utils/Socket";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataprueba = useContext(Context);
  const idfortest = dataprueba.id;

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
          name: item.username,
          id: item.id,
          date: data.data.rows[0].date,
          conversation: data.data.rows,
        };
        console.log(finalConversations);
        return finalConversations;
      }),
    );

    // order conversations for descending date
    const orderConversations = conversationMessages.sort((a, b) => {
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
    console.log("Definiendo socket");
    Socket.emit("connected", idfortest);
    Socket.on("news", async () => {
      console.log("Haz update.....");
      await getmessage();
    });
  };

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
                <div className="card-text" onClick={() => console.log(message)}>
                  <p className="card-name">{message.name}</p>
                  <p className="card-last-messsage-text">
                    {message.conversation[0].text.length > 20
                      ? message.conversation[0].text.slice(0, 20) + " ..."
                      : message.conversation[0].text}
                  </p>
                </div>
              </div>
              <div className="card-arrow-right">
                {" "}
                <p>{new Date(message.date).toTimeString().slice(0, 5)}</p>
                <Icon icon="akar-icons:chevron-right"></Icon>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
