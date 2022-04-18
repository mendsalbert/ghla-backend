const express = require("express");
const router = express.Router();
const { addProductValidation } = require("../validator/product");
const { runValidation } = require("../validator/index");
const { authenticated } = require("../middlewares/authenticate");

const {
  addBookController,
  allBooksController,
  searchBookController,
  getProductController,
  allAdultBooksController,
  allChildrenBooksController,
  dispatchBookController,
  recievedBookController,
} = require("../controllers/book");

//!!FUTURE ROUTES ***** GET-SINGLE-PRODUCT

//@route -- POST api/product/add-product
//@desc -- add a product
//@access -- Public
router.post("/add-book", authenticated, addBookController);

//@route -- POST api/product/edit-product
//@desc -- edit a product
//@access -- Public
router.post(
  "/edit-book/:id",
  // runValidation,
  // authenticated,
  editBookController
);

router.post(
  "/dispatch-book/:id/:userid",
  // runValidation,
  // authenticated,
  dispatchBookController
);

router.post(
  "/recieved-book/:id",
  // runValidation,
  // authenticated,
  recievedBookController
);
//@route -- POST api/product/delete-product
//@desc -- delete a product
//@access -- Public
router.post("/delete-product/:id", authenticated, deleteProductController);

//@route -- GET api/product/all-product
//@desc -- get all products
//@access -- Public

router.get(
  "/get-product/:id",
  //  authenticated,
  getProductController
);

router.get("/all-books", authenticated, allBooksController);
router.get("/all-adult-books", authenticated, allAdultBooksController);
router.get("/all-children-books", authenticated, allChildrenBooksController);

router.post("/search-book/:search", searchBookController);

module.exports = router;
