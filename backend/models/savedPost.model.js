import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SavedPostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
    required: true
  },
  createdAt: {
    type: Date, // Change type to Date
    default: Date.now // Set default value to current timestamp
  },
  userId: { // Define _id explicitly
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
    // auto: true, // Automatically generate _id
    unique: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    // auto: true,
    unique: true,
  }
  
});

const savedPostModel = mongoose.model('SavedPostModel', SavedPostSchema);
export default savedPostModel;