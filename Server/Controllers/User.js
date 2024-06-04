const User = require("../Model/User");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  try {
    const { email, password, firstname, lastname} = req.body;
    if (!email || !password || !lastname || !firstname )
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
        mes: newUser
          ? "Registration successful. Go to login"
          : "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: error.message,
    });
  }
});


module.exports = {
    register
}