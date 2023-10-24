import mongoose from "mongoose";

// Function to establish a connection to the database
export const dbConnect = async () => {
  const DB_URI = process.env.MONGODB_URI;

  if (!DB_URI) {
    console.error("MongoDB URI is not defined. Make sure to set the MONGODB_URI environment variable.");
    return;
  }

  try {
    // Attempt to connect to the database using the provided URI
    await mongoose.connect(DB_URI);
    console.log("== CONNECTION SUCCESSFUL ==");
  } catch (error) {
    console.error("== CONNECTION ERROR ==", error);
  }
};
