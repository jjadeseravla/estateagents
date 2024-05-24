import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  content: {
    type: String,
    enum: ['buy', 'rent'],
    required: true,
  }
});

const PropertySchema = new Schema({
  property: {
    type: String,
    enum: ['flat', 'house', 'studio'],
    required: true,
  }
})

const postSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  imgs: {
    type: [String], // Change to array of strings
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  type: {
    type: TypeSchema,
    required: true
  },
  property: {
    type: PropertySchema,
    required: true
  },
  createdAt: {
    type: Date, // Change type to Date
    default: Date.now // Set default value to current timestamp
  },
  postDetails: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostDetailsModel'
  }]
})

const PostModel = mongoose.model('PostModel', postSchema);
export default PostModel;