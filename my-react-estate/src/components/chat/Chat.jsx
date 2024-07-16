import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chat.scss";
import apiRequest from "../../lib/apiReq";
import { format } from 'timeago.js';
import { SocketContext } from "../../context/SocketContext";

function Chat({chats}) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  console.log('chats.receiver', chats.receiver);

  const handleOpenChat = async(id, receiver) => {
    try {
      console.log('*********', id, receiver); // Log the id and receiver
      const apiUrl = "/chats/" + id;
      console.log('API URL:', apiUrl); // Log the constructed API URL
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      console.log('c h a t', chat, "{text}", {text})
      const res = await apiRequest.post("/messages/" + chat._id, { text });
      setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();

      //send other users info too and send my message in data
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      })
    } catch (e) {
      console.log(e)
    }
  }

  console.log('chatssssss', chats);

  const testSocket = () => {
    socket.emit("test", "hi from client");
  }

  return (
    <div className="chat">
      <button onClick={testSocket}>test meeeee</button>
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((eachChat) => (
          <div className="message"
            key={eachChat._id}
            style={{
              backgroundColor: eachChat.seenBy.includes(currentUser.id)
                ? "white" :
                "#fecd514e"
            }}
            onClick={() => handleOpenChat(eachChat._id, eachChat.receiver)}
          >
          <img
            src={eachChat.receiver?.avatar || "/noavatar.jpg"}
            alt=""
          />
            <span>{eachChat.receiver?.username}</span>
            <p>{eachChat.lastMessage}</p>
        </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "/noavatar.jpg"}
                alt=""
              />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          {chat.messages.map((message) => (
            <div className="center" key={message.id}>
              <div className="chatMessage">
                style={{
                  alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === currentUser.id ? "right": "left",
                }}
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
