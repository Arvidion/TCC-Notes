import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import "./model/index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
 origin: [
    "http://localhost:3000",
    "https://backend-havas-352792921038.us-central1.run.app"
  ], 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());
app.use(route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
