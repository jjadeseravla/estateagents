import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chat.scss";
import apiRequest from "../../lib/apiReq";
import { format } from 'timeago.js';
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chat])

  console.log('chats.receiver', chats.receiver);

  const handleOpenChat = async (id, receiver) => {
    try {
      console.log('*********', id, receiver); // Log the id and receiver
      const apiUrl = "/chats/" + id;
      console.log('API URL:', apiUrl); // Log the constructed API URL
      const res = await apiRequest("/chats/" + id);

      if (!res.data.seenBy.includes(currentUser.id)) {
        // means this chat is unseen and we can decreases its number and never -1
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      console.log('c h a t', chat, "{text}", { text });
      const res = await apiRequest.post("/messages/" + chat._id, { text });
      setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();

      // Send other users info too and send my message in data
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Need to read new message from the receiver on the db
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (e) {
        console.log(e);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        // If equal it means it's the same chat and we can show msg
        if (chat.id === data.chatId) {
          setChat(prev => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off('getMessage');
    };
  }, [chat, socket]);

  console.log('chatssssss', chats);

  const testSocket = () => {
    socket.emit("test", "hi from client");
  };

  return (
    <div className="chat">
      <button onClick={testSocket}>test meeeee</button>
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((eachChat) => (
          <div className="message"
            key={eachChat._id}
            style={{
              backgroundColor: eachChat.seenBy.includes(currentUser.id) || (chat && chat.id === eachChat.id)
                ? "white"
                : "#fecd514e"
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
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>
          {chat.messages.map((message) => (
            <div className="center" key={message._id}>
              <div className="chatMessage" style={{
                alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                textAlign: message.userId === currentUser.id ? "right" : "left",
              }}>
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            </div>
          ))}
          <div ref={messageEndRef}></div>
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
