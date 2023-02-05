const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

reactionSchema
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

module.exports = reactionSchema;
