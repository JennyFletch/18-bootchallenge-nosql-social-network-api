const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

/* 
// Aggregate function to get the number of students overall
const headCount = async () =>
  User.aggregate()
    .count('studentCount')
    .then((numberOfStudents) => numberOfStudents);

// Aggregate function for getting the overall grade using $avg
const grade = async (studentId) =>
  Student.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(studentId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(studentId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);
   */

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        /* const studentObj = {
          students,
          headCount: await headCount(),
        }; */
        console.log(users);
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              // grade: await grade(req.params.studentId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user by id
  updateUser(req, res) {
     User.update({_id: req.params.userId}, { ...req.body }, { new: true })
     .then(res.status(200).json({ message: 'User updated successfully' }))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user by id
  deleteUser(req, res) {

    User.findOneAndRemove({_id: req.params.userId})
    .then(res.status(200).json({ message: 'User deleted successfully' }))
    .catch(err => res.json(err));

    /* User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { students: req.params.studentId },
              { $pull: { students: req.params.studentId } },
              { new: true }
            )
      ) 
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Student deleted, but no courses found',
            })
          : res.json({ message: 'Student successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      }); */
  },

  // ADD FRIEND TO USER
  connectUsers(req, res) {
    console.log("You are linking users");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then((user) =>
      !user
        ? res
          .status(404)
          .json({message: 'No user found with that ID'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  // REMOVE FRIEND FROM USER
  disconnectUsers(req, res) {
    console.log("You are un-linking users");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId }},
      { new: true }
    ).then((user) =>
    !user
        ? res
          .status(404)
          .json({message: 'No user found with that ID'})
        : res.json(user)
    )
  .catch((err) => res.status(500).json(err));
  }
}; 