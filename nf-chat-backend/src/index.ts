import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import connectDB from "./db";
import initWebsockets from "./websockets/server";
import globalRouter from "./global-router";
import { logger } from "./logger";
import { Server } from "socket.io";

connectDB();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://back-2-qxiy18f0a-mkhmtcores-projects.vercel.app/'
  }
})



app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: '*', 
  exposedHeaders: '*',
  credentials: true
}));

app.use(express.json());
app.use(logger);
app.use("/api/v1/", globalRouter);

io.on("connection", (socket) => {
  console.log("user connected")
  console.log(socket)
});


server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

initWebsockets(server);
