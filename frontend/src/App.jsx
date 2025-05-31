import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './Pages/Homepage.jsx';
import CreatePage from './Pages/CreatePage.jsx';
import NoteDetailpage from './Pages/NoteDetailpages.jsx';
// import toast from 'react-hot-toast'; // Uncomment if you're using it

const App = () => {
  return (
    <div className="relative min-h-screen w-full ">
      <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailpage />} />
      </Routes>

    </div>
  );
};

export default App;
