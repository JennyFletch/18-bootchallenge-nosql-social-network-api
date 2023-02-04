const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  connectUsers,
  disconnectUsers
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

/* // /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);
*/

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').put(connectUsers); 
router.route('/:userId/friends/:friendId').delete(disconnectUsers); 

module.exports = router;
