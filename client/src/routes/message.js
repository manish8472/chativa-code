
import api from "../utils/axios";


export const submitMessage = async ({message, conversationId, type, senderId, userId, fileUrl}) => {
  // check if message is not empty
  if (message.trim() !== "") {
    // send message
    console.log(message)
    console.log(fileUrl)

    try {
      // Send POST request with conversationId in the request body
      const response = await api.post("/add/message", {
        message: message,
        conversationId: conversationId,
        type: type,
        senderId: senderId,
        receiverId: userId,
        fileUrl: fileUrl.toString(),
      });
      
      console.log(response.data);
      return response.data;
      
    } catch (err) {
      console.log(err);
    }
  }
};

export const fileUpload = async (data) =>{

    try{
        const res = await api.post('file/upload', data);
        console.log(res.data);
        return res.data
    }catch(err){
        console.log(err);
    }
}