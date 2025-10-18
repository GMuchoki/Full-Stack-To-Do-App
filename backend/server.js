import express from "express";
import todoRoutes from "./routes/todo.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON body
app.use(express.json()); 

// Mount routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});