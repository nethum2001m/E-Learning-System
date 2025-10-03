import axios from 'axios';
import { useState } from 'react';

function EditCoursePage({courseId, lessonId, onClose, refreshLessons}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState(null);

  const handleVideos = (e) => setVideos(e.target.files);
  const handlePdfs= (e) => setPdfs(e.target.files);

  const handleSubmit = async(e)=> {
    e.preventDefault();

    try{
     const formData = new FormData();

     formData.append("title", title);
     formData.append("description", description);

     for(let i=0; i < videos.length; i++) formData.append("videos", videos[i]);
     for(let i=0; i < pdfs.length; i++) formData.append("pdfs", pdfs[i]);

     await axios.post(
      `http://localhost:8000/api/course/materials/upload/${courseId}/${lessonId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }

     );

     alert("Lessons Updated Successfully");
     refreshLessons();
     onClose();

  }catch(err){
    setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 md:w-2/3 lg:w-1/2 bg-white p-10 rounded shadow-xl">
        <h2 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Add Course Lessons Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type='text'
            placeholder='Lesson Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-4 w-full rounded text-lg"
            required
          />

          <textarea
            placeholder='Lesson Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-4 w-full rounded text-lg h-32"
            required
          />

          <div>
            <label className="block mb-2 font-medium">Videos:</label>
            <input type='file' multiple onChange={handleVideos} className="w-full" />
          </div>

          <div>
            <label className="block mb-2 font-medium">PDFs:</label>
            <input type='file' multiple onChange={handlePdfs} className="w-full" />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-4 rounded w-full text-lg font-semibold">
            Save
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditCoursePage;

