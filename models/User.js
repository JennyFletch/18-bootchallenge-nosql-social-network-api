const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: {
      type: [this],
    }
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// ADD A VIRTUAL CALLED friendCount
// retrieves the length of the user's friends array field when called

const User = model('user', userSchema);

module.exports = User;
