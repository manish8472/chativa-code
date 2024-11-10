import { socket } from "../socket/socket"


export const senseAudioCall = ({userId, userToCall}) => {
    
    socket.on("incomingCall", data => {
        console.log(data);
    })
}