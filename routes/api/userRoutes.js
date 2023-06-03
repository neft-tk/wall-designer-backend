const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    postUserLogin,
    createUser,
    updateUser,
    deleteUser,
    readToken
} = require('../../controllers/userController');

// @ api/users
router.route('/')
.get(getUsers)
.post(createUser);

// @ api/users/login
router.route('/login')
.post(postUserLogin)

// @ api/users/readtoken
router.route('/readtoken')
.get(readToken)

// @ api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;