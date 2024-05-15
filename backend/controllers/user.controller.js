import UserModel from '../models/user.model.js';

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
  const body = req.body;

  console.log(id, 'id', tokenUserId, 'tokenUserId') // tokenuserid is undefined
  // console.log(id, 'id', tokenUserId, 'tokenUserId', req) // tokenuserid is undefined
  
  if (id !== tokenUserId) {
    return res.status(403).json({message: 'not authorised as id does not match tokenuserid'})
  }
  
  console.log('**************')
  try {
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(updatedUser)
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to get this user' });
  }
}

export const deleteUser = async (req, res) => {
  try {

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'failed to delete this user' });
  }
}