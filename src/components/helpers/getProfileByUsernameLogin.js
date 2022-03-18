import axios from "axios";
const getProfileByUsernameLogin = async(username, password) => {
    console.log(username);
    console.log(password);
    //Usando funciones async todo await deberia ir con try catch si no me equivoco
    try {
        let response = await axios.get(`http://localhost:3001/api/users/byusernamelogin/${username}/${password}`);
        console.log("Response getUserPass", response);
        return response;
    } catch (error) {
        console.log("error en getUserpass", error)
        return null;
    }


}
export default getProfileByUsernameLogin;