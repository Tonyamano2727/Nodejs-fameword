const router = require("express").Router();
const ctrls = require("../Controllers/Post");

router.post("/createpost/:uid", ctrls.Createpost);
router.delete("/delete/:pid", ctrls.Deletepost);
router.get("/getpost", ctrls.GetPosts);
router.put("/updatepost/:pid", ctrls.UpdatePost);

module.exports = router;
