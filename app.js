require("dotenv").config();
require("express-async-errors");
//async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

//add middleware
app.use(express.json());

//routes

app.get("/", (req, res) =>
  res.send("<h1> Store API </h1><a href='/api/v1/products'>Products Route</a>")
);

//general aroutes that we will use through out
app.use("/api/v1/products", productRouter);

//products routes

//add the error and not found middleware after routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running in ${port}....`));
  } catch (error) {}
};

start();
