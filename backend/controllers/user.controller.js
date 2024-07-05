import UserModel from '../models/user.model.js';
import savedPostModel from '../models/savedPost.model.js';
import bcrypt from '../node_modules/bcrypt/bcrypt.js'; 

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get all users' });
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById( id );
    res.status(200).json(user)
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get this user' });
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId; // should be there as passed it from payload in the verifyToken fn
  const token1 = req.cookies.token;
  const {password, ...inputs} = req.body;


  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
    id, 'id',
    tokenUserId, 'tokenUserId',
    'token1', token1
  ) // tokenuserid is undefined
  
  if (id !== tokenUserId) {
    return res.status(403).json({message: 'not authorised as id does not match tokenuserid'})
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('-------hashedPassword-----', hashedPassword)
    const updatedUser = await UserModel.findByIdAndUpdate(id, { ...req.body, password: hashedPassword },  { new: true });
    const { password: userPassword, ...rest } = updatedUser; // so as to exclude passowrd from being sent in the response
    res.status(200).json(rest);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get this user' });
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  // const tokenUserId = req.userId;

  // if (id !== tokenUserId) {
  //   return res.status(403).json({message: 'not authorised as id does not match tokenuserid'})
  // }

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: `this user has been deleted: ${deletedUser}` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to delete this user' });
  }  
}

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  // const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const savedPost = await savedPostModel.findOne({
      userId: tokenUserId,
      postId: postId
    }).exec();

    if (savedPost) {
      await savedPostModel.findByIdAndDelete(req.userId)
      res.status(200).json({message: 'Post removed from saved list'});
    } else {
      await savedPostModel.create({
        data: {
          userId: tokenUserId,
          postId,
        }
      })
      res.status(200).json({ message: 'Post saved' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to find saved post' });
  }  
}