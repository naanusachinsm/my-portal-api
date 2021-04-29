const mongoose = require("mongoose");
const config = require('../config/config');


const connectToDB = async () => {
    try {
        const con = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true
        })
        console.log(`MongoDB connection established successfully: ${con.connection.host}`);
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectToDB;

