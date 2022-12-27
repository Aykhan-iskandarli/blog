const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDataBase = require("./Db/connectDatabes");
const router = require("./routes/auth");
const category = require("./routes/category");
const errorHandler = require("./middleware/error");
const privateRouter = require("./routes/private");

//app
const app = express();
dotenv.config();

connectDataBase()

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//cors
if (process.env.NODE_ENV === "development") {
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}

app.use("/api", router);
app.use("/api", privateRouter);
app.use("/api", category);
// Error Handler Middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is successfully, port ${PORT}`));

// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Logged Error: ${err.message}`);
//     server.close(() => process.exit(1));
//   });