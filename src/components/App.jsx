import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  
  // Fetch notes from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched notes:", data);  // For debugging
        setNotes(data);
      })
      .catch((err) => console.error("Error fetching notes:", err));  // Error handling
  }, []);

  function addNote(newNote) {
    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((savedNote) => {
        console.log("Note saved:", savedNote);  // For debugging
        setNotes((prevNotes) => [...prevNotes, savedNote]);
      })
      .catch((err) => console.error("Error adding note:", err));  // Error handling
  }

  function deleteNote(id) {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        console.log("Note deleted:", id);  // For debugging
      })
      .catch((err) => console.error("Error deleting note:", err));  // Error handling
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.length === 0 ? (
        <p>No notes available. Add one!</p>
      ) : (
        notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default App;
