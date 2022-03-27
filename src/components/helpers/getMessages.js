import axios from "axios";
const getMessages = async (id, type) => {
  // let typeurl = type === "users" ? "withuser" : "withgroup";
  // console.log("tipo", typeurl);
  const response = await axios.get(
    `http://localhost:3001/api/messages/withuser/${id}`,
  );

  return response;
};
export default getMessages;
