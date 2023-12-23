import express from "express";
import { PORT, mongo_URI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import { Book } from "./Models/book.models.js";
import bookRoute from "./routes/book.route.js";

const app = express();
//middleware for parsing request body
app.use(express.json());

//Handling cors policy
//op1:Allow all origin with default of cors(*)
app.use(cors());

//op2:Allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "DELETE", "UPDATE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/books", bookRoute);

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
