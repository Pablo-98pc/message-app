import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../App";
import "./inbox.css";
import getMessages from "../../helpers/getMessages";
import getMessagesBetween from "../../helpers/getMessagesBetween";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataprueba = useContext(Context);

  const idfortest = dataprueba.id;
  const getmessage = useCallback(async () => {
    const conversarions = await getMessages(idfortest, "users");

    const conversationMessages = await Promise.all(
      conversarions.data.map(async (item) => {
        const data = await getMessagesBetween(idfortest, item.id, "withuser");
        const finalConversations = {
          name: item.username,
          date: data.data.rows[0].date,
          conversation: data.data.rows,
        };
        return finalConversations;
      }),
    );

    const orderMessages = conversationMessages.sort(function (a, b) {
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
    console.log("conversation", orderMessages);

    setMessages(orderMessages);
    setIsLoading(false);
  }, [idfortest, messages]);

  useEffect(() => {
    getmessage();
  }, [dataprueba]);

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
              <div onClick={() => console.log(message)}>
                <p className="card-text">{message.name}</p>
                <p className="card-last-messsage-text">
                  {message.conversation[0].text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
