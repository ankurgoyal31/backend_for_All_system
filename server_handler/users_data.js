import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { get_s } from "./ai_category.js";
import cors from "cors";
const router = express.Router();
const port = 5000;
import dotenv from "dotenv";
dotenv.config();
router.use(cors());
router.use(express.json());
  
const client = new MongoClient(process.env.MONGO_URI);

let All_journal;

async function connectDB() {
 
  await client.connect();

  const db = client.db("User_data");

  All_journal = db.collection("All_journal");

}

connectDB();

router.post("/user_data", async (req, res) => {
  try {

    const { journal, user_id } = req.body;

    let data = await get_s(journal);

    await All_journal.insertOne({
      user_id,
      journal,
      data
    });

    res.json({
      success: true,
      data
    });

  } catch (err) {

    console.log(err);

    res.json({ success: false });

  }

});

router.get("/get_data", async (req, res) => {

  try {

    const user_id = req.query.user_id;

    let data = await All_journal
      .find({ user_id })
      .toArray();
 if(data.length===0){ 
   res.send({success:false,data:[]})
 }
    res.json({
      success: true,
      data
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });

  }

});

router.post("/delete", async (req, res) => {

  try {
    await All_journal.deleteOne({_id: new ObjectId(req.body.id)});

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.json({ success: false });

  }

});
export default router;
 
