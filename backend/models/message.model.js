import mongoose from 'mongoose';

console.log('Registering Message model');
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  createdAt: { type: Date, default: Date.now }
});

// const Message = mongoose.model('Message', messageSchema);
const MessageModel = mongoose.model('Message', messageSchema);
 export default MessageModel;