const User = require("../Model/User");
const asyncHandler = require("express-async-handler");
// const {
//   generrateAccessToken,
//   generrateRefreshToken,
// } = require("../Middleware/jwt");

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !lastname || !firstname)
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });
    const user = await User.findOne({ email: email });
    if (user) throw new Error("User already exists");
    else {
      const newUser = await User.create(req.body);
      return res.status(200).json({
        success: newUser ? true : false,
        newUser,

        // Using for client if use toast
        // mes: newUser
        //   ? "Registration successful. Go to login"
        //   : "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: error.message,
    });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    response,
    // mes: response
    //   ? `User have deleted`
    //   : "No user delete",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select('-refreshToken -password -role')
  return res.status(200).json({
      success: response ? true : false,
      users: response
  })
})

const updateUser = asyncHandler(async (req, res) => {

  // Can use const = { _id } = req.user if have logged 
  // I use  const { uid } = req.params because i don't loggin 

  console.log(req.params); 
  // Help log data 

  const { uid } = req.params
  if (!uid || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role')
  return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : 'Some thing went wrong'
  })
})

module.exports = {
  register,
  deleteUser,
  getUsers,
  updateUser
};
