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
        type: Schema.Types.ObjectId
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${(this.friends).length}`;
  });

const User = model('user', userSchema);

module.exports = User;
