const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
       Thought.create(req.body)
      // then add new thought id to user table in db
      .then((thought) => {
        console.log("the user is " + req.body.userId);
        
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought.id }},
          { new: true },
        ).then(res.json(thought));
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought to add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: 
          { reactions: 
            {
              "reactionBody": req.body.reactionBody,
              "username": req.body.username
            }
          }
        },
        { new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: ' No thought found with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought to delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: 
          { reactions: 
            {
              _id: req.params.reactionId 
            } 
          }
        },
        { new: true },
    ).then((thought) =>
      !thought
          ? res
            .status(404)
            .json({message: 'No thought found with that ID'})
          : res.json(thought)
      )
    .catch((err) => res.status(500).json(err));
  }
};
