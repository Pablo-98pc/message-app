import axios from "axios";
const getMessagesBetween = async (id2, id1, type) => {
  const response = await axios.get(
    `http://localhost:3001/api/messages/withuser/${id1}/${id2}`,
  );

  return response;
};
export default getMessagesBetween;
