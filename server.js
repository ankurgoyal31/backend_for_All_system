import express from "express";
import "./civic/sr.js";
import "./movie/sr.js";
import "./chat/sr.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Main server running");
});