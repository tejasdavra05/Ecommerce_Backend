const express = require("express");
const { createProduct, getaPoduct, getallProduct, updateProduct, deleteaProduct, addToWishlist, rating } = require("../controller/productCtrl");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

const router = express.Router()

router.post("/",authMiddleware,isAdmin,createProduct)
router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/rating",authMiddleware,rating)

router.get("/:id",getaPoduct)
router.get("/",authMiddleware,isAdmin,getallProduct)
router.patch("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteaProduct)

module.exports = router;