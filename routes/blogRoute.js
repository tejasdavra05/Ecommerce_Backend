const {Router} = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createBlog, updateBlog, getallBlogs, getBlog, deleteBlog, likeBlog, disLikeBlog } = require("../controller/blogCtrl")
const router = Router()

router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/likes',authMiddleware,likeBlog)
router.put('/dislikes',authMiddleware,disLikeBlog)

router.put('/:id',authMiddleware,isAdmin,updateBlog)
router.get('/all-blogs',authMiddleware,isAdmin,getallBlogs)
router.get('/:id',getBlog)
router.delete("/:id",authMiddleware,isAdmin,deleteBlog)

module.exports = router