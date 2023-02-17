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
const multer = require('multer');
const path = require('path');
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
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        console.log(file,"file")
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('photo');
  
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Hata: Yalnızca resim dosyaları yüklenebilir!');
    }
  }


// app.post('/upload', upload, async (req, res) => {
//     console.log(req.file.path,"file")
//     try {
//       const { title, description } = req.body;
//       const newBlog = new Blog({ title, description, photo: req.file.path });
//       await newBlog.save();
//       res.send('Blog başarıyla oluşturuldu!');
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   });


// Error Handler Middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is successfully, port ${PORT}`));

// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Logged Error: ${err.message}`);
//     server.close(() => process.exit(1));
//   });

