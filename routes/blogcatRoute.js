const {Router} = require("express");
const { createCategory, updateCategory, deleteCategory, getaCategory, getallcategories } = require("../controller/blogcatCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = Router()

router.post('/', authMiddleware,isAdmin,createCategory)
router.put('/:id', authMiddleware,isAdmin,updateCategory)
router.delete('/:id', authMiddleware,isAdmin,deleteCategory)
router.get('/:id', authMiddleware,isAdmin,getaCategory)
router.get('/', authMiddleware,isAdmin,getallcategories)

module.exports = router