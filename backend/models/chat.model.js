import mongoose from 'mongoose';

console.log('Registering Chat model');
const chatSchema = new mongoose.Schema({
  userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  lastMessage: String
  // lastMessage: { type: String } 
});

// const Chat = mongoose.model('Chat', chatSchema);
const ChatModel = mongoose.model('Chat', chatSchema);
 export default ChatModel;
