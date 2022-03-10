import axios from "axios";
const postNewUser = async (body,type) => {
    console.log(body.date.toString());
     const response = await axios.post(`http://localhost:3001/api/messages/newmessage/${type}`,body);
    /* const response = await axios.get(`http://localhost:3001/api/messages/getmessagebydate/${body.date}.tostring()`); */
     
    return response
}
  export default postNewUser;