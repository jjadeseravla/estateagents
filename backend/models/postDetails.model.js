import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const PostDetailsSchema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'UserModel',
//     required: true
//   },
//   postId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PostModel',
//     required: true
//   },
//   desc: {
//     type: String,
//     required: true,
//   },
//   utilities: {
//     type: String,
//   },
//   pet: {
//     type: String,
//   },
//   income: {
//     type: String,
//   },
//   size: {
//     type: Number,
//   },
//   school: {
//     type: Number,
//   },
//   bus: {
//     type: Number,
//   },
//   restaurant: {
//     type: Number,
//   }
// });

// const postDetailsModel = mongoose.model('PostDetailsModel', PostDetailsSchema);
// export default postDetailsModel;



const postDetailsSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  utilities: String,
  pet: String,
  income: String,
  size: Number,
  school: Number,
  bus: Number,
  restaurant: Number,
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', unique: true, required: true }
});

const postDetailsModel = mongoose.model('PostDetailsModel', postDetailsSchema);
export default postDetailsModel;