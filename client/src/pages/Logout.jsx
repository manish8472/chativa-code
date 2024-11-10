import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // disconnected user from socket io server and other people see , this person go offline
    socket.disconnect();

    dispatch(removeAuth());
    localStorage.removeItem('currentUser');
    navigate('./signin');
}

export default Logout
