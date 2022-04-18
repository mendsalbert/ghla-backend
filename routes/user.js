const express = require("express");
const router = express.Router();
const {
  registerUserController,
  forgetPasswordController,
  getAllUsersController,
  getAllAdultsController,
  getAllChildrenController,
  getAllMyBooksController,
  getAllMyBooksOverdueController,
} = require("../controllers/user");
const { authenticated } = require("../middlewares/authenticate");
const { runValidation } = require("../validator/index");
const {
  userSignInValidator,
  userForgetPassword,
} = require("../validator/user");

//@route -- POST api/user
//@desc -- Register a user
//@access -- Public

router.post("/", userSignInValidator, runValidation, registerUserController);
router.get("/all-users", getAllUsersController);
router.get("/all-adults", getAllAdultsController);
router.get("/all-children", getAllChildrenController);
router.get("/all-mybooks", authenticated, getAllMyBooksController);
router.get("/all-overdue", authenticated, getAllMyBooksOverdueController);

router.post(
  "/forget-password",
  userForgetPassword,
  runValidation,
  forgetPasswordController
);

module.exports = router;
