const mongoose = require("mongoose");
const connectToDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
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

