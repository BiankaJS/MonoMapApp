import mongoose from "mongoose"

interface connectionOptions{
  mongoUrl: string,
  dbName: string
}

export class MongoDatabase{
  static async connect(options: connectionOptions) {
    try {
      await mongoose.connect(options.mongoUrl, { dbName: options.dbName});
      console.log("Connected to the database");
    }
    catch(error) {
      console.error("Error conneting to the database");
    }
  }
}