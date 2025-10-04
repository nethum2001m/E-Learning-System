import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CoursesPage() {

    const [courses, setCourses] = useState([]);
    const[error, setError] = useState(null);
    const navigate = useNavigate();

    //get all courses
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:8000/api/course/all");
                setCourses(response.data);
            }catch(err){
               setError(err);
            }
        }
        fetchData();
    },[])

    //delete a course
    const handleDelete  = async(id) =>{
        try{
            const confirmDel = window.confirm("Are you sure wan to delete ?")
            if(!confirmDel){
                return ;
            }else{
                await axios.delete(`http://localhost:8000/api/course/delete/${id}`);
                //remove deleted course
                setCourses(courses.filter((c) => c._id !==id));
            }

        }catch(err){
            setError(err);
        }
    }

    //navigate to lesson adding form
    const updateCourse = (id) =>{
      navigate(`/courseEditPage/${id}`);
    }

    
  return (
    <div>
  <h2 className="text-5xl text-center font-extrabold text-indigo-600 mt-7 mb-10">
    All Courses
  </h2>

  <div className="grid grid-cols-2 grid-rows-1 gap-6 p-10">

    {courses.map((course) => (
      <div key={course._id}
        className="relative bg-indigo-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
      >
        <h3 className="text-3xl font-bold mb-4 text-indigo-800">{course.title}</h3>
        <p className="text-indigo-950 mb-3">{course.description}</p>
        <p className="text-indigo-700 font-medium">{course.payOrFree}</p>
        <div className= "absolute bottom-4 right-4" >
            
            <div className="grid grid-cols-2 gap-2">

                <button onClick = {()=> updateCourse(course._id)}
                        className="px-4 py-2 rounded-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 border border-black shadow-md transition">Edit</button>
                <button onClick={() => handleDelete(course._id)} 
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 border border-black shadow-md transition">Delete</button>
            
            </div>      
        </div>   
      </div>
    ))}

  </div>
</div>



  )
}

export default CoursesPage