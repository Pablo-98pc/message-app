import axios from "axios";
const postNewUser = async (body) => {
    console.log(body);
    await axios.post(`http://localhost:3001/api/users/newuser`,body);
    const response = await axios.get(`http://localhost:3001/api/users/byusername/'${body.username}'`);
     
    return response
}
  export default postNewUser;