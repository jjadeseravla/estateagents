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
  const id = req.params.id;

  console.log('***************', req.params)

  try {
    const post = await PostModel.findById(id)
    .populate('postDetails')
      .populate({
        path: 'userId',
        select: 'username avatar'
      });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}


export const addPost = async (req, res) => {
  const body = req.body;
  console.log('----body--------', body)
  const tokenUserId = req.userId; // dont think this works

  try {
    const newPost = await PostModel.create({
      // data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetails,
        }
      // }
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


// /posts
// {
//  "postData": {
  //   "title": "Title1",
  //   "price": 111,
//   "imgs": [
// "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
// "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      //],
  //   "address": "address1",
  //   "city": "City1",
  //   "bedroom": 2,
  //   "bathroom": 2,
  //   "type": "rent",
  //   "property": "apartment",
  //   "latitude": "51.5074",
//   "longitude": "-0.1278"
// },
// "postDetails": {
//   "desc": "Desc1",
//   "utilities": "owner is responsible",
//   "pet": "allowed",
//   "income": "3 x income",
//   "size": 88,
//   "school": 1200,
//   "bus": 800,
//   "restaurant": 1500
  // }
// }
