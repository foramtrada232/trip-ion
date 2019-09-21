 const express = require("express");
const router = express.Router();
const withAuth = require('../middleware/withAuth');
const decryptData = require('../middleware/decryptData');
const fileUpload = require('../middleware/fileUpload');
// Controllers
const UserController = require("../controller/user.controller");

// Validations
const authValidate = require('../middleware/authValidate');
const UserValidation = require("../validations/UserValidations");

// router.use(decryptData);

router.post("/signup", UserValidation.signup, UserController.signup);
router.post("/login", UserValidation.login, UserController.login);
router.put("/logout",UserController.logOut);
router.post("/forgot-password", UserValidation.forgotPassword, UserController.forgotPassword)
router.post("/email-verify/:hash", UserController.emailVerification);
router.post("/facebook-login",UserController.facebookLogin);
router.post("/google-login",UserController.googleLogin);
router.put("/edit-profile",authValidate.validateToken,UserController.editProfile);
router.get("/get-login-user-data",authValidate.validateToken, UserController.getLoginUserData);
router.get("/get-all-users",authValidate.validateToken, UserController.getAllUsers);
router.post("/update-password", authValidate.validateToken, UserValidation.updatePassword, UserController.updatePassword);

module.exports = router;
