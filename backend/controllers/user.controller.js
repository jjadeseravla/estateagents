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
  const token1 = req.cookies.token;
  const {password, ...inputs} = req.body;

  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', req,
    id, 'id',
    tokenUserId, 'tokenUserId',
    'token1', token1
  ) // tokenuserid is undefined
  
  if (id !== tokenUserId) {
    return res.status(403).json({message: 'not authorised as id does not match tokenuserid'})
  }
  
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });
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