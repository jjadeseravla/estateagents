import PostModel from '../models/post.model.js';
import savedPostModel from '../models/savedPost.model.js';
import PostDetailsModel from '../models/postDetails.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    // setTimeout(() => {
      res.status(200).json(posts);
    // }, 3000);
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

    let userId;

    const token = req.cookies?.token;

    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, 'jwtsecretkey', async (err, payload) => { 
        if (err) {
          userId = null;
        } else {
          //we are authenticated
          userId = payload.id;
        }
      })
    }

    const saved = await savedPostModel.findOne({
      userId: id,
      postId: postId
    }).exec(); 
    
    res.status(200).json({ ...post, isSaved: saved ? true: false });
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'failed to get postssss'})
  }
}

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId; // Make sure req.userId is correctly set by middleware

  // Log the body and tokenUserId to debug
  console.log('----body--------', body);
  console.log('----tokenUserId--------', tokenUserId);

  if (!body.postData) {
    return res.status(400).json({ message: "postData is required" });
  }

  if (!body.postDetail || !body.postDetail.desc) {
    return res.status(400).json({ message: "postDetail with desc is required" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('Starting to create new post');
    const newPost = new PostModel({
      ...body.postData,
      userId: tokenUserId
    });

    const savedPost = await newPost.save({ session });
    console.log('Saved new post:', savedPost);

    const postDetail = new PostDetailsModel({
      ...body.postDetail,
      userId: tokenUserId,
      postId: savedPost._id
    });

    const savedPostDetail = await postDetail.save({ session });
    console.log('Saved post detail:', savedPostDetail);

    savedPost.postDetails.push(savedPostDetail._id);
    await savedPost.save({ session });
    console.log('Updated post with post details:', savedPost);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(savedPost);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.log('Error occurred:', err);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
  // try {
  //   const newPost = await PostModel.create({
  //     // data: {
  //       ...body.postData,
  //       userId: tokenUserId,
  //     postDetail: [{
  //       ...body.postDetails,
  //       }
  //       ]
  //     // }
  //   })
  //   res.status(200).json(newPost);
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).json({message: 'failed to get postssss'})
  // }
}


// const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const newPost = new PostModel({
//       ...body.postData,
//       userId: tokenUserId
//     });

//     const savedPost = await newPost.save({ session });

//     const postDetail = new PostDetailsModel({
//       ...body.postDetail,
//       userId: tokenUserId,
//       postId: savedPost._id
//     });

//     const savedPostDetail = await postDetail.save({ session });

//     savedPost.postDetails.push(savedPostDetail._id);
//     await savedPost.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(200).json(savedPost);
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     console.log(err);
//     res.status(500).json({ message: "Failed to create post" });
//   }











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
