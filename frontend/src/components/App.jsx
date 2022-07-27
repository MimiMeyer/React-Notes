import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
const url = window.location.href;




function App() {
  const [listNotes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url+"notes")
    .then (res => {
      setNotes(res.data);

    })
    .catch(err => console.log(err)
    )
});


  function addNote(note) {
    setNotes((prevValue) => [...prevValue, note]);
    axios.post(url+'add', note)
    .catch((err)=> console.log(err));
    
  }
  
  function deleteNote(id) {
    const updatedList = listNotes.filter((note, index) => index !== id);
    setNotes(updatedList);
    axios.post(url+"delete", {idNote: id})
      .catch((err) => console.log(err));
  }
  
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {listNotes.map((note, index) => (
        <Note 
          key={index}
          id={note._id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
      
    </div>

  );
}

export default App;
