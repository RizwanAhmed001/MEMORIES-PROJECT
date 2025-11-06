import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongoDB.ts";
import memoryRoute from "./routes/memoriesRoute.ts";
import loginRoute from "./routes/loginRoute.ts";

const app = express();
connectDB();

app.use(express.json());
app.use(cors())

app.use("/api", memoryRoute);
app.use("/api", loginRoute);

app.use("/", (req, res) => {
  res.send("API WORKING!")
})



const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`)
})