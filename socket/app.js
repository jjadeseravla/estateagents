import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

//store all my users using unique ids
//whenever we connect to our server, we create a new user
//get the userId from our client and save it inside onlineuser arr
//whenever we connect to socket, we need to create a new user
let onlineUser = [];

const addUser = (userId, socketId) => {
  // does user exist inside this arr?
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
}

const removeUser = (socketId) => {
  // using the socketId we can find out user 
  //and remove it from the array
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
}

//send private msgs
const getUser = (userId) => {
  //if theyre equal, means this is the user im looking for, and it'll return that user to me
  return onlineUser.find((user) => user.userId === userId);
}
// after finding this user i can use a unique socket.id and send a unique event



// socket.id gives us a unique id for each connection(twice cos using strict mode)
io.on("connection", (socket) => {
  // socket.on("test", (data) => {
  //   console.log(data);
  // })

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log('onlineUser on socket/app', onlineUser); // should get userid and socketid
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(receiverId, data);
    // data should console.log the message which has: {
  //           "_id": "66914f692f38c0ad5ccb3a72",
  //           "text": "does this work today",
  //           "userId": "669140907f4ce2b813be8224",
  //           "chatId": "66914b3c86a06631be70e84b",
  //           "createdAt": "2024-07-12T15:44:41.629Z",
  //           "__v": 0
    //       }
    
    const receiver = getUser(receiverId);
    if (receiver) {
      //send msg to other user and pass the socketId from other user
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.error(`Receiver with ID ${receiverId} not found.`);
    }
  })

  //if we close our window/tab, we'll be disconnected:
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User with socket ID ${socket.id} disconnected.`);;
  })

});

io.listen(4000);