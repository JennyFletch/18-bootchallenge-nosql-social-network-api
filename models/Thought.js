const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1, 
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

// ADD A VIRTUAL CALLED reactionCount
// retrieves the length of the thought's reactions array field when called

// Create a virtual property `upvoteCount` that gets the amount of comments per user
/* thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.meta.upvotes;
  }); */

  // NEED ANOTHER GETTER
  // formats the createdAt when called


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
