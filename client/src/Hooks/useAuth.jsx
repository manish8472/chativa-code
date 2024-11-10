import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { socket } from '../socket/socket';
import { setActiveUsers } from '../app/slice/socket/ActiveUser';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }else {
       socket.on("connect", () => {
         console.log("Connected to socket io successfully");
          socket.emit("addUser", currentUser); // Emit user data after connection
          socket.on("getUsers", activeUsers => {
           dispatch(setActiveUsers(activeUsers));
          })
       });
    }
  }, [navigate,currentUser])

  // useEffect(() => {
    
  // },[currentUser])
  
}


