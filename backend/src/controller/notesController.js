import Note from "../models/Note.js";


export const getallNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1}); // Fetch all notes from the database
        res.status(200).json(notes); // Send the notes as a JSON response

        
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' }); // Send an error response
        
    }
}


export const getNoteById = async(req , res)=>{
    try {
      
        const note = await Note.findById(req.params.id); // Find a note by its ID


        if(!note){
            return  res.status(404).json({message:"note not found"});
            
        }
        res.json(note);
        
    } catch (error) {
         console.error("Error in getNoteById controller", error);
         res.status(500).json({ message: "Internal server error" });
        
    }
}






export const createNote = async (req, res) => {
  try {
    const {title , content} = req.body;
    const newNote = new Note({title , content});
    const saveNote = await newNote.save();
    res.status(201).json(saveNote); // Send the created note as a JSON response


    
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Internal server error' }); // Send an error response
    
  }
}


export  const updatedNote = async(req , res)=>{
    try {
        const {title , content} = req.body;
    const updatednote = await Note.findByIdAndUpdate(req.params.id,{title , content} , { new: true }); // Update the note with the given ID and return the updated note
        if (!updatednote) {
            return res.status(404).json({ message: 'Note not found' }); // If the note doesn't exist, send a 404 response
        }
        res.status(200).json({message: 'Note updated successfully'}); // Send a success response


        
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' }); // Send an error response

    }
}


export const deleteNote = async(req, res)=>{
    try {
        const deletedNote   = await Note.findByIdAndDelete(req.params.id); // Delete the note with the given ID
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' }); // If the note doesn't exist, send a 404 response
        }
        res.status(200).json({ message: 'Note deleted successfully' }); // Send a success response
        
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' }); // Send an error response

        
    }
}