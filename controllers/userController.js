const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Design } = require("../models");

// get all users and their designs
async function getUsers(req, res) {
  try {
    const usersData = await User.findAll({
      include: [
        {
          model: Design,
        },
      ],
    });
    return res.status(200).json(usersData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occured retrieving all user data." });
  }
}

// get a single user and their designs
async function getSingleUser(req, res) {
  try {
    const userData = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Design,
        },
      ],
    });
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occured retrieving a single users data" });
  }
}

// User login
async function postUserLogin(req, res) {
  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ msg: "invalid user/username" });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "invalid password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "A login error has occured" });
  }
}

// User sign up
async function createUser(req, res) {
  try {
    const createUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      {
        id: createUserData.username,
        email: createUserData.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "14d",
      }
    );
    return res.status(200).json({ token, user: createUserData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occurred creating a new user." });
  }
}

// Update a user (probably won't user but just in case)
async function updateUser(req, res) {
  try {
    const updateUserData = await User.update(
      {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );
    return res.status(200).json(updateUserData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occurred updating this user." });
  }
}

// Delete user (again, probably won't use but just in case)
async function deleteUser(req, res) {
  try {
    const deleteUserData = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    return res.status(200).json({ msg: "User deleted." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occurred deleting this user." });
  }
}

// json Token validation
async function readToken(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: userData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occured while reading the JWT." });
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  postUserLogin,
  createUser,
  updateUser,
  deleteUser,
  readToken,
};
