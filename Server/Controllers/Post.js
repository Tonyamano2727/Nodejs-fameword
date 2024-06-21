const asyncHandler = require("express-async-handler");
const Post = require("../Model/Post");
const User = require("../Model/User");

// const Createpost = asyncHandler(async (req, res) => {
//   try {
//     const { content, title } = req.body;
//     if (!content || !title)
//       return res.status(400).json({
//         success: false,
//         mes: "Missing input",
//       });
//     else {
//       const newPost = await Post.create(req.body);
//       return res.status(200).json({
//         success: newPost ? true : false,
//         newPost,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       mes: error.message,
//     });
//   }
// });

const Createpost = asyncHandler(async (req, res) => {
  try {
    const { uid } = req.params; // Lấy userId từ URL params
    const { content, title } = req.body;

    if (!content || !title) {
      return res.status(400).json({
        success: false,
        mes: "Missing input",
      });
    }

    // Tạo bài post với userId
    const newPost = await Post.create({
      ...req.body,
      user: uid,
    });

    // Cập nhật model User để lưu post
    await User.findByIdAndUpdate(
      uid,
      { $push: { posts: newPost._id } },
       // Giả sử bạn có một mảng `posts` trong model User
      { new: true }
    );

    return res.status(200).json({
      success: newPost ? true : false,
      newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: error.message,
    });
  }
});

const Deletepost = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const response = await Post.findByIdAndDelete(pid);
  return res.status(200).json({
    success: response ? true : false,
    response,
  });
});

const GetPosts = asyncHandler(async (req, res) => {
  const response = await Post.find();
  return res.status(200).json({
    success: response ? true : false,
    post: response,
  });
});

const UpdatePost = asyncHandler(async (req, res) => {
  // Can use const = { _id } = req.user if have logged
  // I use  const { uid } = req.params because i don't loggin

  console.log(req.params);
  // Help log data

  const { pid } = req.params;
  if (!pid || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await Post.findByIdAndUpdate(pid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatePost: response ? response : "Some thing went wrong",
  });
});

module.exports = {
  Createpost,
  Deletepost,
  GetPosts,
  UpdatePost,
};
