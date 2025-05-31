import React from 'react';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
const NoteCard = ({note ,setNotes}) => {
const handleDelete = async (e, id)=> {
  e.preventDefault();  // get rid of the navigation behavior of the Link
  // Prevent the click from propagating to the Link

  if (window.confirm("Are you sure you want to delete this note?")) {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");

      // Optionally, you can handle the UI update here
      // For example, you can call a function passed as a prop to update the notes list
      // setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  }
}




  return (
   <Link to= {`/note/${note._id}`}    className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]" >

        <div className='card-body'>
          <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}  
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
          </div>


        </div>

   </Link>
  );
}

export default NoteCard;
