import axios from "axios";
const getMessagesBetween = async (id2, id1, type) => {
    let typeurl = type === 'users'? 'withuser': 'withgroup';
    console.log(typeurl);
    console.log(id2);
    console.log(id1);
      const response = await axios.get(`http://localhost:3001/api/messages/${typeurl}/${id1}/${id2}`);
     
    return response
}
  export default getMessagesBetween;