import axios from "axios";
const getData = async (id, type) => {
      console.log(id+' en teoria id del usuario a busacar');
      const response = await axios.get(`http://localhost:3001/api/${type}/${id}`);
     
    return response
}
  export default getData;