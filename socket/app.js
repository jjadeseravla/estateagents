import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

//store all my users using unique ids
//whenever we connect to our server, we create a new user
//get the userId from our client and save it inside onlineuser arr
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
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(receiverId);
  })

  //if we close our window/tab, we'll be disconnected:
  socket.on("disconnect", () => {
    removeUser(socket.id)
  })

});

io.listen(4000);