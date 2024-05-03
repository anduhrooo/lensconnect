import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/ChatComponents/Sidebar';
import API from '../../utils/API';
import io from 'socket.io-client'

const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);

// API.getRoomById(id).then((roomData) => {
//   console.log(roomData);
// });


export default function Chat(props) {
  const URL_PREFIX = "http://localhost:3000"

  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState([]);
  const [roomData, setRoomData] = useState([]);

    useEffect(() => {
      // Creates a new socket connection
      const newSocket = io(URL_PREFIX);
      setSocket(newSocket);
      return () => newSocket.close();
  }
  // runs setSocket when the socket is created
  , [setSocket]);
    
    //hook to get the user data
    useEffect(() => {
      //if there is no user id, return
      if(!props.userId) {
        return
      }
      // Runs the getOneUser function from the API utils page
      API.getOneUser(props.userId).then((userData) => {
        setUser(userData);
        // console.log(userData);
      });
      // runs setUser function when the user data is retrieved
    }
    , [props.userId]);

    useEffect(() => {
      if(!id) {
        return
      }

      API.getRoomById(id).then((roomData) => {
        setRoomData(roomData);
      });
    }
    , []);

    // socket.emit('joinRoom', roomData.room_name);

  return (
    <div>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-800">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Chat
          </h2>
      </div>
      </div> */}
      <div>
            <div>
                <Sidebar userId={props.userId} socket={socket}/>
            </div>
      </div>
    </div>
  );
}   
