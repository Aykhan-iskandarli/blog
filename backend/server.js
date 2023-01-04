const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDataBase = require("./Db/connectDatabes");
const auth = require("./routes/auth");
const category = require("./routes/category");
const tags = require("./routes/tags");
const errorHandler = require("./middleware/error");
const privateRouter = require("./routes/private");
const blog = require("./routes/blog");

//app
const app = express();
dotenv.config();

connectDataBase()

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())
//cors
if (process.env.NODE_ENV === "development") {
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}

app.use("/api", auth);
app.use("/api", privateRouter);
app.use("/api", category);
app.use("/api", tags);
app.use("/api", blog);

// Error Handler Middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is successfully, port ${PORT}`));

// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Logged Error: ${err.message}`);
//     server.close(() => process.exit(1));
//   });