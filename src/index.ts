import 'dotenv/config';
import connectDB from "./config/connectDB";
import app from "./app";
import { MONGODB_URI, PORT } from './util/var';

connectDB(MONGODB_URI)
    .then(() => {
      app.listen(PORT, (): void => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });