import React from 'react';
import Navbar from '../component/Navbar';
import { useState } from 'react';
import RateLimitedUI from '../component/RateLimitedUi.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import NoteCard from '../component/NoteCard.jsx';
import axiosInstance from '../lib/axios.js';
import NotesnotFound from '../component/NotesnotFound.jsx';

const Homepage = () => {
    const [isratelimited , setIsRateLimited] = useState(false);
    const [notes  , setNotes] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        const fetchNotes = async()=>{
            
            try {
               const res = await  axiosInstance.get("/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false)

                
            } catch (error) {
                
                console.error("Error fetching notes:", error);
                if (error.response && error.response.status === 429) {

                    // If the error is a rate limit error, set the state to true
                    setIsRateLimited(true);
                } else {
                    // Handle other errors
                    toast.error("Failed to fetch notes. Please try again later.");
                }
              

            }
            finally {
                setLoading(false);
            }
        }

        fetchNotes();


    }, []);

  return (
    <div className='min-h-screen'>
        
      <Navbar />
      {isratelimited && <RateLimitedUI/>}

        <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !isratelimited  && < NotesnotFound/> } 

        {notes.length > 0 && !isratelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        </div>


      
    </div>
  );
}

export default Homepage;
