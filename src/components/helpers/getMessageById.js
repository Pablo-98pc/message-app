import axios from "axios";
const getMessageById = async (id) => {
      const response = await axios.get(`http://localhost:3001/api/messages/message/${id}`);
     
    return response
}
  export default getMessageById;