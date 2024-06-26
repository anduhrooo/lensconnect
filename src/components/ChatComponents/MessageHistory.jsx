import React, { useState, useEffect } from "react";
import API from "../../utils/API";

const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);

function MessageHistory() {
    const [roomData, setRoomData] = useState([]);
    const [rerender, setRerender] = useState(true)

    useEffect(() => {
        API.getRoomById(id).then((roomData) => {
            setRoomData(roomData);
        });
        setInterval(()=> {setRerender(!rerender)}, 3000)
    }
    , [rerender]);

return (
    <>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]" style={{ height: '30rem', overflowY: 'scroll'}}>

        {roomData.Chats && roomData.Chats.map((message, index) => (
            <div key={index}>
                <span style={{ color: 'grey' }}>{message.username}</span>: {message.message} - {new Date(message.createdAt).toLocaleString()}
            </div>
        ))}
    </div>
    </>
);
}

export default MessageHistory;
