import express from "express";
import productRoutes from "./routes/product-routes/ProductRoutes";
import cors from "cors"; // Import the CORS middleware
import morgan from "morgan"; // Import Morgan
require('dotenv').config(); // Import dotenv


// Import the database configuration
import { dbConnect } from "./config/database";

// Import the Swagger configuration
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(express.json());

// Add CORS middleware
app.use(cors());

// Execute the function to connect to the database
dbConnect();

// Configure Swagger
setupSwagger(app);

// Configure the Morgan middleware for request logging
app.use(morgan("dev")); // Use 'dev' format for logs


app.use("/", productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // Print the application URL and Swagger UI URL in the console
  console.log(`Server running at: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/api-docs`);
});
