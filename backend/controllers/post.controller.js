import PostModel from '../models/post.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}


export const getPost = async (req, res) => {
  const id = req.params;

  try {
    const post = await PostModel.findById( id );
    res.status(200).json(post)
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}


export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId; // dont think this works

  try {
    const newPost = await PostModel.create({
      data: {
        ...body,
        userId: tokenUserId,
      }
    })
    res.status(200).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}


export const updatePost = async (req, res) => {
  try {
    res.status(200).json()
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}


export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  
  try {
    const post = await PostModel.findById(id);

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: 'you are not the owner as userId and tokenUserId do not match' });
    }

    await PostModel.findByIdAndDelete(id);
    res.status(200).json({message: 'successfully deleted post'})
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}