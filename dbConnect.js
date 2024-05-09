const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.uoifqsc.mongodb.net/pracrtiseDb`
    );
    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
