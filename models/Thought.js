const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
);

thoughtSchema
  .virtual('dateFormat')
  // Getter
  .get(function () {
    var date = new Date(this.createdAt); 

    var mo = date.getMonth()+1;
    var d = date.getDate();
    var y = date.getFullYear();
    var h = date.getHours();
    var min = date.getMinutes();

    return `${mo}/${d}/${y} at ${h}:${min}`;
  });
  
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${(this.reactions).length}`;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
