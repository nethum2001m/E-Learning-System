import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses,setFilteredCourses] = useState([])
    const [paidOrFree,setPaidOrFree] = useState("")
    const [search,setSearch] = useState("")
    const [currentPage,setCurrentPage] =useState(1)
    const coursesPerPage = 12
    const indexOfLastCourse = currentPage * coursesPerPage 
    const indexOfFirstCourse = indexOfLastCourse-coursesPerPage
    const currentCourses = filteredCourses.slice(indexOfFirstCourse,indexOfLastCourse) 
    const totalPages = Math.ceil(filteredCourses.length/coursesPerPage)
    const navigate = useNavigate()
    const URL = "http://localhost:8000/api/student/getAllCourses";
    const [courseCategory,setCourseCategory] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        const getCourses = async () => {
            try {
                const res = await axios.get(URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourses(res.data.courses);
                setFilteredCourses(res.data.courses)
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
    }, []);

    useEffect(()=>{
        let filterCourseList;
        setCurrentPage(1)
        if(courseCategory=="" && paidOrFree=="")
        {
            filterCourseList = courses        
        }
        else if(courseCategory!="" && paidOrFree!="")
        {
            const courseList1 = courses.filter((course)=>course.Category===courseCategory)
            const courseList2 = courseList1.filter((course)=>course.payorFree===paidOrFree)
            filterCourseList = courseList2
        }
        else if(courseCategory!="")
        {
            const courseList1 = courses.filter((course)=>course.Category===courseCategory)
            filterCourseList = courseList1
        }
        else if(paidOrFree!="")
        {
            const courseList2 = courses.filter((course)=>course.payorFree===paidOrFree)
            filterCourseList = courseList2
        }
        if(search!="")
        {
            const courseList3 = filterCourseList.filter((course)=>course.title.toLowerCase().includes(search.toLowerCase()))
            setFilteredCourses(courseList3)
            return
        }else
        {
            setFilteredCourses(filterCourseList)
            return
        }
    },[courseCategory,paidOrFree,search])

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
                    Available Courses
                </h1>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white rounded-xl shadow-lg p-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow"
                    />
                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            value={courseCategory}
                            onChange={(e) => setCourseCategory(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow"
                        >
                            <option value="">Course Category</option>
                            <option value="Technology & IT">Technology & IT</option>
                            <option value="Business & Management">Business & Management</option>
                            <option value="Personal Development">Personal Development</option>
                            <option value="Creative Arts & Design">Creative Arts & Design</option>
                            <option value="Science & Engineering">Science & Engineering</option>
                            <option value="Language & Communication">Language & Communication</option>
                            <option value="Health & Fitness">Health & Fitness</option>
                            <option value="Life Skills & Lifestyle">Life Skills & Lifestyle</option>
                            <option value="Exams & Certification Prep">Exams & Certification Prep</option>
                            <option value="Others / Emerging Topics">Others / Emerging Topics</option>
                        </select>
                        <select
                            value={paidOrFree}
                            onChange={(e) => setPaidOrFree(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow"
                        >
                            <option value="">Paid or Free</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                </div>

                {/* Courses Grid */}
                {currentCourses.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        No courses are available at the moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {currentCourses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col hover:-translate-y-2 transform border border-blue-100 group"
                            >
                                <div className="h-48 w-full overflow-hidden rounded-t-3xl relative">
                                    <img
                                        src={`http://localhost:8000/getImages/images/${course.lessonPicture}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{course.Category}</span>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                                        {course.title}
                                    </h2>
                                    <span className="text-gray-500 text-sm mb-2">
                                        By <span className="font-medium">{course.teacherName}</span>
                                    </span>
                                    <div className="flex items-center justify-between mb-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
                                                course.payorFree === 'Free'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {course.payorFree}
                                        </span>
                                        {course.payorFree === "Paid" ? (
                                            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 font-bold px-4 py-1 rounded-full shadow border border-yellow-300 text-lg ml-2">
                                                Rs. {course.price}
                                            </span>
                                        ) : null}
                                    </div>
                                    <button className="mt-auto bg-gradient-to-r
                                     from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold 
                                     py-2 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                     onClick={()=>navigate(`/student/courseDetails/${course._id}`)}>
                                        More Info
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={()=>setCurrentPage(prev=>Math.max(prev-1,1))}
                            disabled={currentPage===1}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))}
                            disabled={currentPage===totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
