import "./newmessage.css";
import { useRef, useContext } from "react";
import postNewMessage from "../helpers/postNewMessage";
import getProfileByUsername from "../helpers/getProfileByUsername";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

export default function NewMessage() {
  const data = useContext(Context); //logged user data
  const type = "user";
  const navigate = useNavigate();
  const subject = useRef();
  const message = useRef();
  const receiver = useRef();

  const handleAnswer = async (event) => {
    event.preventDefault();
    if (receiver.current.value !== "") {
      const userId = await getProfileByUsername(receiver.current.value);

      let bodytosend = {
        groupmessage: false,
        text: message.current.value,
        subject: subject.current.value,
        from_user: data.id,
        to_user: userId?.id,
        date: new Date(),
      };
      console.log("bodytosend", bodytosend);
      await postNewMessage(bodytosend, type).then((newData) => {
        console.log(newData);
      });
      message.current.value = "";
      subject.current.value = "";
      receiver.current.value = "";

      navigate("/");
      console.log("pase por navegati");
    }
  };

  return (
    <div className="main">
      <form class="new-message">
        <div className="form-header">
          <input
            type="text"
            placeholder="subject"
            ref={subject}
            name="subject"
          />
          <input
            type="text"
            placeholder="to"
            name="touser"
            ref={receiver}
            required
          />
        </div>
        <div className="form-message">
          <textarea
            id="textinput"
            type="text"
            maxLength="300"
            placeholder="Text"
            name="message"
            ref={message}
            required
          />
        </div>
        <div className="form-button">
          <button onClick={handleAnswer}>Submit</button>
        </div>
      </form>
    </div>
  );
}
