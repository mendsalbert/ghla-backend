const Book = require("../models/Book");
const User = require("../models/User");
const fs = require("fs");
const formidable = require("formidable");

exports.addBookController = async (req, res, next) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      const { title, number, copynumber, author, assertion, type } = fields;

      const saveBook = async () => {
        if (files.image.size > 2000000) {
          return res.json({ msg: "Please select file sizes less than 4MB" });
        }
        var image = fs.readFileSync(files.image.path);
        var encImage = new Buffer(image).toString("base64");

        const book = new Book({
          title,
          number,
          copynumber,
          author,
          assertion,
          type,
          image: encImage,
        });

        let savedBook = await book.save();
        res.json(savedBook);
      };

      if (typeof files.image === "object") {
        saveBook();
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.editBookController = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      const id = req.params.id;
      const { title, number, copynumber, author, assertion, type } = fields;

      const saveBook = async () => {
        var encImage = "";
        if (typeof files.image === "object") {
          if (files.image.size > 2000000) {
            return res.json({ msg: "Please select file sizes less than 4MB" });
          }
          var image = fs.readFileSync(files.image.path);
          encImage = new Buffer(image).toString("base64");
        } else {
          let book = await Book.findByIdAndUpdate(id, {
            title,
            number,
            copynumber,
            author,
            assertion,
            type,
            image: encImage,
          });

          let savedBook = await book.save();
        }
      };

      saveBook();
    });

    res.json("success");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    let oldProduct = await Product.findById(id);
    for (var i = 0; i < oldProduct.image.length; i++) {
      await fs.unlink("assets/productImages/" + oldProduct.image[i], (err) => {
        console.log("deleted old product and added a new one");
      });
      await Product.findByIdAndRemove(id);
    }
    res.json({ msg: "product deleted successfully" });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.allBooksController = async (req, res) => {
  try {
    let allBooks = await Book.find({});
    res.json(allBooks);
  } catch (error) {
    res.json(error);
  }
};
exports.allAdultBooksController = async (req, res) => {
  try {
    let allBooks = await Book.find({ type: "Adult" });
    res.json(allBooks);
  } catch (error) {
    res.json(error);
  }
};

exports.allChildrenBooksController = async (req, res) => {
  try {
    let allBooks = await Book.find({ type: "Children" });
    res.json(allBooks);
  } catch (error) {
    res.json(error);
  }
};

exports.getProductController = async (req, res) => {
  try {
    // console.log("working");
    let id = req.params.id;
    let product = await Product.find({ _id: id });
    res.json(product);
    // console.log("product", product);
  } catch (error) {
    res.json(error);
  }
};

exports.searchBookController = async (req, res) => {
  try {
    let searchQuery = req.params.search;
    let allbooks = await Book.find({ $text: { $search: searchQuery } });
    res.json(allbooks);
  } catch (error) {
    res.json(error);
  }
};

exports.dispatchBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userid;

    const { renewDate } = req.body;

    let book = await Book.findByIdAndUpdate(
      { _id: id },
      {
        renewDate,
      }
    );

    let userBook = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          books: id,
        },
      }
    );

    await userBook.save();
    await book.save();

    res.json("success");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.recievedBookController = async (req, res) => {
  try {
    const id = req.params.id;
    let book = await Book.findByIdAndUpdate(
      { _id: id },
      {
        receive: true,
      }
    );

    await book.save();

    res.json("success");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.renewBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const { renewDate } = req.body;

    let book = await Book.findByIdAndUpdate(
      { _id: id },
      {
        renewDate,
      }
    );

    await book.save();

    res.json("success");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.allBooksOverdueController = async (req, res) => {
  try {
    // .gte(x)
    let now = Date.now();
    // let allBooks = await Book.find({
    //   renewDate: {
    //     $gte: now,
    //   },
    // });
    let allBooks = await Book.find().where("renewDate").gte(now);
    res.json(allBooks);
  } catch (error) {
    res.json(error);
  }
};

exports.updateOverdueController = async (req, res) => {
  try {
    let now = Date.now();

    let options = { multi: true, upsert: true };

    let updatedBooks = await Book.updateMany(
      {
        renewDate: {
          $gte: now,
        },
      },
      { isOverdue: true },

      options
    );

    res.json(updatedBooks);
  } catch (error) {
    res.json(error);
  }
};
