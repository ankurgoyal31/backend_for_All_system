
import express from "express";
import chat from "./chat/sr.js";
import movie from "./movie/sr.js";
import complaint from "./complaint/sr.js";
import journal from "./journal/ai_category.js"
const app = express();

app.use("/chat", chat);
app.use("/movie", movie);
app.use("/complaint", complaint);
app.use("/journal", journal);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});
