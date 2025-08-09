import { betterAuth } from "better-auth";
import dbConnect from '@/lib/dbConnect'; // Assuming this connects to MongoDB
import mongoose from "mongoose"; // Assuming Mongoose is used for MongoDB

export const auth = betterAuth({
  database: {
    connect: async () => {
      await dbConnect(); // Connect to MongoDB
      return mongoose.connection.db; // Return the MongoDB database instance
    },
  },
  // Add other configurations like providers for email/password, social sign-on
});