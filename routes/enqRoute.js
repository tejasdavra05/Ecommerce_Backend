const {Router} = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getaEnquiry, getallEnquirys } = require("../controller/enqCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = Router()

router.post('/',createEnquiry)
router.put('/:id', authMiddleware,isAdmin,updateEnquiry)
router.delete('/:id', authMiddleware,isAdmin,deleteEnquiry)
router.get('/:id', authMiddleware,isAdmin,getaEnquiry)
router.get('/', authMiddleware,isAdmin,getallEnquirys)

module.exports = router