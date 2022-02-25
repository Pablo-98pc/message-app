import axios from "axios";
const getMessages = async (id, type) => {
    let typeurl = type === 'user'? 'withuser': 'withgroup';
      const response = await axios.get(`http://localhost:3001/api/messages/${typeurl}/${id}`);
     
    return response
}
  export default getMessages;