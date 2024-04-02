const {Router} = require("express");
const { createBrand, updateBrand, deleteBrand, getaBrand, getallbrands } = require("../controller/brandCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = Router()

router.post('/', authMiddleware,isAdmin,createBrand)
router.put('/:id', authMiddleware,isAdmin,updateBrand)
router.delete('/:id', authMiddleware,isAdmin,deleteBrand)
router.get('/:id', authMiddleware,isAdmin,getaBrand)
router.get('/', authMiddleware,isAdmin,getallbrands)

module.exports = router