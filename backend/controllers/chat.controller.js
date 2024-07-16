import ChatModel from '../models/chat.model.js';
// import MessageModel from '../models/message.model.js';
import UserModel from '../models/user.model.js';

export const getChats = async (req, res) => {

  const tokenUserId = req.userId;

  try {
    const chats = await ChatModel.find({
      // Find chats where tokenUserId is in userIDs
      userIDs: { $in: [tokenUserId] }
      // userIDs: tokenUserId
    }).exec();

    //   // Iterate over each chat to find and attach the receiver information
    // for (const chat of chats) {
    //   const receiverId = chat.userIDs.find((id) => id.toString() !== tokenUserId.toString());
    //   // inputs 2 ids, and if its not our id, its the other user

    //   const receiver = await UserModel.findById(receiverId).select('id username avatar').exec();
    //   // gives back all user info but we just need username and avatar
    //   // Attach the receiver's details to the chat object
    //   chat.receiver = receiver;
    // }
    // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$CHATS', chats)
    // //chats needs receiver inside but not there?!

    // res.status(200).json(chats);
     // Convert each chat to a plain JavaScript object and attach the receiver information
     const chatWithReceivers = await Promise.all(chats.map(async (chat) => {
      const chatObject = chat.toObject();
      const receiverId = chatObject.userIDs.find(id => id.toString() !== tokenUserId.toString());

      // Find receiver's information
      const receiver = await UserModel.findById(receiverId).select('id username avatar').exec();
      chatObject.receiver = receiver;

      return chatObject;
    }));

    res.status(200).json(chatWithReceivers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get chats' });
  }
}

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  console.log('Token User ID:', tokenUserId);
  console.log('Chat ID HEREEEEEE:', chatId);
  try {
    const chat = await ChatModel.findOne({
      _id: chatId,
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