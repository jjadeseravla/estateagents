import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const SavedPostSchema = new Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'UserModel',
//     required: true
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PostModel',
//     required: true
//   },
//   createdAt: {
//     type: Date, // Change type to Date
//     default: Date.now // Set default value to current timestamp
//   },
//   userId: { // Define _id explicitly
//     type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
//     // auto: true, // Automatically generate _id
//     unique: true,
//   },
//   postId: {
//     type: mongoose.Schema.Types.ObjectId,
//     // auto: true,
//     unique: true,
//   }
  
// });

// const savedPostModel = mongoose.model('SavedPostModel', SavedPostSchema);
// export default savedPostModel;







const savedPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

// const SavedPost = mongoose.model('SavedPost', savedPostSchema);
const savedPostModel = mongoose.model('SavedPostModel', savedPostSchema);
export default savedPostModel;
