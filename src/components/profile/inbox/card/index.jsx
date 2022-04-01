import { Icon } from "@iconify/react";
import { useState } from "react";
import getProfileByUsername from "../../../helpers/getProfileByUsername";


export default function Card({ setCurrentMessage, index, message, typeCard }) {
  const DefaultCard = () => {
    return (
      <div
        className="card-body"
        onClick={() => {
          // console.log("indexmap", index);
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
        </div>
      </div>
    );
  };

  const NewCard = () => {
    const [newChat, setNewChat] = useState("");
    const [validUser,setValidUser] = useState(false);
    const handleInput = e =>{
        setNewChat(e.target.value);
        
    }
    const handleEnter = async e =>{
        if (e.key === 'Enter') {
            console.log("enter");
            generateChat();
          }
    }

    const generateChat = async()=>{
       let userTo = await checkUser();
       if(userTo !== null){
            console.log("Im in")
       }else{
           console.log("No existe user");
       }
    }

    const checkUser = async()=>{
        let data = await getProfileByUsername(newChat);
        if(data){
            return {username:data.username,id:data.id}
        }else{
            return null;
        }
    }
    return (
      <div className="card-body new-chat-container">
        <input
          type="text"
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
