require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.ATLAS_URI);

const db = mongoose.connection;
db.once('open', () => console.log("Successfully Connected to Database"));

const noteSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String }
}, {
  timestamps: true,
});



const note = mongoose.model("note",noteSchema);

app.get("/", function (req,res){
    
    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);
            
        }
    });
});

app.post("/add", function(req,res){

    const newNote = new note(req.body);
    newNote.save();

    console.log("New Note Added Successfully");
    
});

app.post("/delete", function(req,res){

    const id = req.body.idNote;
    note.findByIdAndDelete(id, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note Deleted Successfully");
            
        }
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Example app listening at http://localhost:${PORT}`);
});