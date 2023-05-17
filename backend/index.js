const express = require("express");
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const articleRouter = require("./routes/articleRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/article", articleRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
