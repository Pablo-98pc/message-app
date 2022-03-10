import axios from "axios";
const getProfileByUsernameLogin = async (username,password) => {
    console.log(username);
    console.log(password);
    let response = await axios.get(`http://localhost:3001/api/users/byusernamelogin/'${username}'/${password}`);
    console.log(response.data); 
    return response;
}
  export default getProfileByUsernameLogin;