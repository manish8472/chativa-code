import { useSelector } from 'react-redux';
import { setChatMessages } from '../app/slice/MessageSlice';
import {socket} from './socket';
import {useEffect, useState} from 'react';
import { increaseUnreadCount } from '../routes/chatcontact';


export const senceMessage = (dispatch) => {
    const [incomingMessage, setIncomingMessage] = useState([]);

      const senderId = JSON.parse(localStorage.getItem("currentUser"))?.userId;
       let conversationId = useSelector(
         (state) => state?.chatuser?.participants.receiver?.conversationId
       );

    useEffect(() => {
      socket.on("getMessage", (msg) => {
        setIncomingMessage(msg);
      });
    }, []);

    // update incomming message using socket io
    useEffect(() => {
      const message = {
        message: incomingMessage.message,
        timestamp: incomingMessage.timestamp,
        fileUrl: incomingMessage.fileUrl || "",
        type: incomingMessage.type,
        senderId: incomingMessage.senderId,
      };
      if (
        incomingMessage.receiverId === senderId &&
        incomingMessage.conversationId === conversationId
      ) {
        dispatch(setChatMessages(message));
      } else if (
        incomingMessage.receiverId === senderId 
      ) {
        console.log("increse unread count");
        increaseUnreadCount({
          userId: incomingMessage.receiverId,
          conversationId: incomingMessage.conversationId,
          message: incomingMessage.message,
          dispatch,
        });
      }
    }, [incomingMessage]);

}