import React from "react";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link , useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content){ 
      toast.error("Please fill in all fields");
        return;
    }

    setLoading(true);
    
    try {
        await axiosInstance.post("http://localhost:5001/api/notes" ,{
            title,
            content
        })
        toast.success("Note created successfully");
        setTitle("");
        setContent("");
      
        // Redirect to homepage after successful creation
        navigate("/");



      


        
    } catch (error) {
        console.error("Error creating note:", error);

        toast.error("Failed to create note. Please try again.");
        // Optionally, you can log the error or handle it in a way that suits your application
        if(error.response.status ===429) {
            toast.error("Too many requests. Please try again later.");
        }
    }
    finally {
        setLoading(false);
    }

       
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            {" "}
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
            </div>






        </div>
      </div>
      /
    </div>
  );
};

export default CreatePage;
