import express from 'express';
import { createNote, deleteNote, getallNotes, getNoteById, updatedNote } from '../controller/notesController.js';


const router = express.Router();

// Define a route to get all notes
router.get('/' , getallNotes);

router.get('/:id' , getNoteById);



// Define a route to create a new note
router.post('/' , createNote);


router.put('/:id' , updatedNote); // Update the note with the given ID
// Define a route to update a specific note by ID   

router.delete('/:id' , deleteNote);


export default router;
