import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostDetailsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  utilities: {
    type: String,
  },
  pet: {
    type: String,
  },
  income: {
    type: String,
  },
  size: {
    type: Number,
  },
  school: {
    type: Number,
  },
  bus: {
    type: Number,
  },
  restaurant: {
    type: Number,
  }
});

const postDetailsModel = mongoose.model('PostDetailsModel', PostDetailsSchema);
export default postDetailsModel;