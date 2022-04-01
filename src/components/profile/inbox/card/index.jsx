import { Icon } from "@iconify/react";
import { useState,useEffect} from "react";
import getProfileByUsername from "../../../helpers/getProfileByUsername";

export default function Card({
  setCurrentMessage,
  setMessages,
  index,
  message,
  messages,
  typeCard,
  setIsNewMessage,
  setZIndex,
}) {
  const DefaultCard = () => {
    // console.log("LOG", message);
    const [updatedLength,setUpdatedLength] = useState(message.conversation.length - 1);
    let hasMessages = message.conversation.length > 0;
    useEffect(() => {
      setUpdatedLength(message.conversation.length - 1);
    }, [message]);
    let tempDate = new Date(message.conversation[updatedLength].date);
    tempDate.setHours(tempDate.getHours() + 2);
    return (
      <div
        className="card-body"
        onClick={() => {
          // console.log("indexmap", index);
          setZIndex({ zIndex: 10 });
          setIsNewMessage(false);
          setCurrentMessage(index);
        }}
        key={index}
      >
        <div className="card-flex">
          <div className="card-container-pic">
            <img src="" alt="" />
          </div>
          <div className="card-text">
            <p className="card-name">{message.name}</p>
            {hasMessages ? (
              <p className="card-last-messsage-text">
                {message.conversation[updatedLength].text.length > 20
                  ? message.conversation[updatedLength].text.slice(0, 20) + " ..."
                  : message.conversation[updatedLength].text}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="card-arrow-right">
          {hasMessages ? (
            <p>
              { tempDate
                .toTimeString()
                .slice(0, 5)}
            </p>
          ) : (
            ""
          )}

          <Icon icon="akar-icons:chevron-right"></Icon>
        </div>
      </div>
    );
  };

  const NewCard = () => {
    const [newChat, setNewChat] = useState("");
    const [validUser, setValidUser] = useState(false);
    const handleInput = (e) => {
      setValidUser(false);
      setNewChat(e.target.value);
    };
    const handleEnter = async (e) => {
      if (e.key === "Enter") {
        generateChat();
      }
    };

    const generateChat = async () => {
      //Verificacion si existe el user
      let userTo = await checkUser();
      if (userTo !== null) {
        //Verificacion si tenemos chat activo
        let userId = messages.findIndex((x) => x.userid === userTo.id);
        //En caso de existir ya un chat con el usuario lo abre
        if (userId !== -1) {
          setCurrentMessage(userId);
        } else {
          //   console.log("userTo", userTo);
          let tempState = [...messages];
          tempState.unshift({
            userid: userTo.id,
            name: userTo.username,
            date: "",
            conversation: [],
          });
          setIsNewMessage(false);
          setMessages(tempState);
          setCurrentMessage(0);
          setZIndex({ zIndex: 10 });
          
          
        }
      } else {
        //Falta gestion de notificar que no existe el usuario
        // console.log("No existe user");
        document.getElementById("input-new").classList.add("error-input");
      }
    };

    const checkUser = async () => {
      let data = await getProfileByUsername(newChat);
      if (data) {
        setValidUser(true);
        return { username: data.username, id: data.id };
      } else {
        return null;
      }
    };
    return (
      <div className="card-body new-chat-container">
        <input
          autoFocus
          type="text"
          id="input-new"
          value={newChat}
          onChange={handleInput}
          className="new-chat-input"
          onKeyDown={handleEnter}
          placeholder={"Nombre de usuario..."}
        />
        {/* <div className="card-flex">
          <div className="card-container-pic">
            <img src="" alt="" />
          </div>
          <div className="card-text">
            <p className="card-name">{message.name}</p>
            <p className="card-last-messsage-text">
              {message.conversation[message.conversation.length - 1].text
                .length > 20
                ? message.conversation[
                    message.conversation.length - 1
                  ].text.slice(0, 20) + " ..."
                : message.conversation[message.conversation.length - 1].text}
            </p>
          </div>
        </div>
        <div className="card-arrow-right">
          <p>{new Date(message.date).toTimeString().slice(0, 5)}</p>
          <Icon icon="akar-icons:chevron-right"></Icon>
        </div> */}
        <Icon icon="akar-icons:chevron-right" onClick={generateChat}></Icon>
      </div>
    );
  };
  return typeCard ? <DefaultCard /> : <NewCard />;
}
