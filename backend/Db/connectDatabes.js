const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const connectDataBase = ()=>{
    mongoose.connect(process.env.CONNECT_DB,{
        useNewUrlParser:true,
    }).then(()=>console.log("Successfully connection db"))
    .catch((err)=>console.log(err))
}


module.exports = connectDataBase