import MessageModel from '../models/message.model.js';
import ChatModel from '../models/chat.model.js';

export const addMessage = async (req, res) => {
console.log('---------- 1')
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  console.log('---------- 2', chatId, tokenUserId)


  try {
    const chat = await ChatModel.findOne({
      _id: chatId,
      userIDs: tokenUserId,
    }).exec();

    if (!chat) return res.status(404).json({ message: 'chat not found' });

    const message = await MessageModel.create({
      text,
      chatId,
      userId: tokenUserId
    });
    console.log('M e s s a g e ', message )

    chat.messages.push(message._id);
    chat.seenBy = [tokenUserId]; // these like seenBy are a method i have stated in the chat Model
    chat.lastMessage = text;
    await chat.save();

    res.status(200).json(message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to add message' });
  }
}