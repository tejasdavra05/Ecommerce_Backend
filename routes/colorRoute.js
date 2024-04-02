const {Router} = require("express");
const { createColor, updateColor, deleteColor, getaColor, getallColors } = require("../controller/colorCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = Router()

router.post('/', authMiddleware,isAdmin,createColor)
router.put('/:id', authMiddleware,isAdmin,updateColor)
router.delete('/:id', authMiddleware,isAdmin,deleteColor)
router.get('/:id', authMiddleware,isAdmin,getaColor)
router.get('/', authMiddleware,isAdmin,getallColors)

module.exports = router