import ChatModel from '../models/chat.model.js';
import MessageModel from '../models/message.model.js';

export const getChats = async (req, res) => {

  const tokenUserId = req.userId;

  try {
    const chats = await ChatModel.find({
      userIDs: tokenUserId
    }).exec();
    res.status(200).json(chats);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get chats' });
  }
}

export const getChat = async (req, res) => {

  const tokenUserId = req.userId;
  // console.log(req);
  //console.log('******************', tokenUserId, 'req.params.id', req.params.id)
  // ITS THE SAMMMMMMMMME
  try {
    const chat = await ChatModel.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    }).populate('messages').exec();

    if (!chat) {
      return res.status(404).json({message: 'chat has not been found'})
    }

    chat.seenBy.push(tokenUserId);
    await chat.save();
    // seenBy field of the chat document, which is an array that 
    //stores user IDs indicating which users have seen the chat.
    //marks the chat as seen by the current user by adding their ID to the seenBy array.

    res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get chat' });
  }
}

export const addChat = async (req, res) => {

  const tokenUserId = req.userId;

  try {
    const newChat = new ChatModel({
      userIDs: [tokenUserId, req.body.receiverId]
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to add chat' });
  }
}

export const readChat = async (req, res) => {

  const tokenUserId = req.userId;

  try {
    const updatedChat = await ChatModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: tokenUserId,
      },
      {
        $addToSet: { seenBy: tokenUserId },
      },
      { new: true }
    ).exec();

    if (!chat) {
      return res.status(404).json({ message: 'chat was not found, so cannot be updated' });
    }

    res.status(200).json(updatedChat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to read chat' });
  }
}