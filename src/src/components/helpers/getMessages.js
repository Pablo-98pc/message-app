import axios from "axios";
const getMessages = async (id, type) => {
  const response = await axios.get(
    `http://localhost:3001/api/messages/withuser/${id}`,
  );

  return response;
};
export default getMessages;
