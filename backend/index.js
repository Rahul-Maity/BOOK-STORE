import express from "express";
import { PORT, mongo_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/book.models.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

//route for save a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "All fields required" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//mongoose connection
mongoose
  .connect(mongo_URI)
  .then(() => {
    console.log(`App connected to database`);

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
