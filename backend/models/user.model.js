import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { // Define _id explicitly
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type
    auto: true // Automatically generate _id
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date, // Change type to Date
    default: Date.now // Set default value to current timestamp
  }
});
  
  userSchema.virtual('id').get(function() { // Manually create virtual id field
    return this._id.toHexString();
  });
  

// module.exports = mongoose.model('UserModel', userSchema);


const UserModel = mongoose.model('UserModel', userSchema); // Assign the model to a variable

export default UserModel; // Export the model as default