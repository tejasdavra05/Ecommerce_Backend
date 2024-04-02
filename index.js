const express = require("express");
const connectDB = require("./config/connect");
const path = require("path");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogcatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const colorRouter = require("./routes/colorRoute");
const enquiryRouter = require("./routes/enqRoute");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();

connectDB(process.env.MONGODB_URL);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./views")));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
