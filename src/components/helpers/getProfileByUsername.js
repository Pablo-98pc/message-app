import axios from "axios";
const getProfileByUsername = async (username) => {
  let response = await axios.get(
    `http://localhost:3001/api/users/byusername/'${username}'`,
  );
  return response.data;
};
export default getProfileByUsername;
