import express, { application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import dailyRoutes from "./routes/dailyRoutes.js";
import unlimitedRoutes from "./routes/unlimitedRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";

const path = require('path');
const PORT = process.env.PORT || 5001;
const app = express();
app.set('port', (process.env.PORT || 5001))
app.use(cors());

dotenv.config();

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) =>
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/daily", dailyRoutes);
app.use("/api/unlimited", unlimitedRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/players", playersRoutes);



app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
