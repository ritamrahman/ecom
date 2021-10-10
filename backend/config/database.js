const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((con) => {
      //   console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
      console.log(`Database connection Successful`);
    });
};

module.exports = connectDatabase;
