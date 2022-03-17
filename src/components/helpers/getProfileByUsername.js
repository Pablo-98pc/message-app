import axios from "axios";
const getProfileByUsername = async(username) => {
    console.log(username);
    let response = await axios.get(`http://localhost:3001/api/users/byusername/'${username}'`);
    console.log(response.data);
    return response;
}
export default getProfileByUsername;