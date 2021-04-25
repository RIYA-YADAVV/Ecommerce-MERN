const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const app = express();
const PORT = process.env.PORT || 8000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://riya:riya@cluster0.wgksl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(`--DB connected--`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, (error) => {
  if (error) {
    console.log(`--Error in starting the server-- ${error}`);
    return;
  }
  console.log(`--Server is up and running on ${PORT} --`);
});
