const {Router} = require("express");
const { createUser,loginUserCtrl, getallUser, getaUser, deleteaUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUsercart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus } = require("../controller/userCtrl");
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");
const router = Router();

router.post("/register",createUser)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)
router.put("/password",authMiddleware,updatePassword)

router.post("/login",loginUserCtrl)
router.post("/admin-login",loginAdmin)
router.post("/cart",authMiddleware,userCart)
router.post("/cart/applycoupon",authMiddleware,applyCoupon)
router.post("/cart/cash-order",authMiddleware,createOrder)
router.get("/all-users",getallUser)
router.get("/get-orders",authMiddleware,getOrders)

router.get("/refresh",handleRefreshToken)
router.get("/wishlist",authMiddleware,getWishlist) 
router.get("/cart",authMiddleware,getUsercart) 
router.get("/logout",logout)
router.get("/:id",authMiddleware,isAdmin,getaUser)
router.delete("/empty-cart",authMiddleware,emptyCart)
router.delete("/:id",deleteaUser)
router.patch("/edit-user",authMiddleware,updateUser)
router.patch("/save-address",authMiddleware,saveAddress)

router.patch("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.patch("/unBlock-user/:id",authMiddleware,isAdmin,unblockUser)


module.exports = router;