import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {loadStripe} from "@stripe/stripe-js"
import axios from 'axios'
const CourseDetailsPage = () => {
    const [courseDetail,setCourseDetails] = useState({})
    const navigate = useNavigate()
    const [userId,setUserId] = useState('')
    const {id} = useParams()
    let userID
    const [disable,setDisable] = useState(false)
    const URL = `http://localhost:8000/api/course/getCourseDetails/${id}`
    const validateAuthURL = "http://localhost:8000/api/student/verifyStudentToken"
    const enrollURL = "http://localhost:8000/api/student/enrollStudents"
    const stripeURL = "http://localhost:8000/api/student/stripeEnrolment"
    const key = process.env.REACT_APP_CURRENCY_CONVERTER
    const stripekey = process.env.REACT_APP_STRIPE_KEY
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${key}/latest/`;
     const convertCurrency = async (from, to, amount) => {
    try {
      const response = await axios.get(`${BASE_URL}${from}`);
      const rate = response.data.conversion_rates[to];
      if (!rate) {
        console.log(`Exchange rate for ${to} not found.`);
        return 0;
      }
      var convertedAmount = parseFloat((amount * rate).toFixed(2));
      return convertedAmount;
    } catch (error) {
      console.error("Error fetching exchange rate:", error.message);
      return 0;
    }
  };
    useEffect(()=>{
        const token = localStorage.getItem("token")
        
        const validateAuthandgetCourseDetails = async() =>{
            await axios.post(validateAuthURL,null,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }).then((res)=>{
                setUserId(res.data.userid)
                userID = res.data.userid
            }).catch((err)=>{
                console.log(err.message)
            })
            await axios.get(URL,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }).then((res)=>{
                const enrolledStudents = res.data.course.enrollStudents
                for(const student of enrolledStudents)
                {
                    if(student.StudentID==userID)
                    {
                        setDisable(true)
                    }
                }
                setCourseDetails(res.data.course)
            }).catch((err)=>{
                console.log(err)
            })

        }
        validateAuthandgetCourseDetails()
        
    },[])
    const visitLectureMaterials = () =>{
        navigate(`/student/courseInclude/${courseDetail._id}`)
    }

    const enroll = async() =>{
        const token = localStorage.getItem("token")
        if(courseDetail.payorFree=="Free")
        {
                await axios.post(enrollURL,{
                    courseId:courseDetail._id,
                    userId:userId
                },{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                }).then((res)=>{
                    alert("Enrolled successfully")
                    navigate(`courseInclude/${courseDetail._id}`)
                }).catch((error)=>{
                    console.log(error)
                })
        }
        else if(courseDetail.payorFree=="Paid")
        {
            const token = localStorage.getItem("token")
           
            const items = [
                {
                    quantity:1,
                    priceUSD:await convertCurrency("LKR","USD",courseDetail.price),
                    name:courseDetail.title,
                    price:courseDetail.price
                }
            ]
            await axios.post(stripeURL,{
                    items:items,
                    courseId:courseDetail._id,
                    userId:userId
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(async(res)=>{
                    const { url } = res.data;
                    window.location.href = url;
                }).catch((error)=>{
                    alert(error)
    })
        }
    }
    return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-10 px-4 flex justify-center items-center">
                <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-8">
                    {/* Course Image at Top */}
                    <img
                        src={`http://localhost:8000/getImages/images/${courseDetail.lessonPicture}`}
                        alt={courseDetail.title}
                        className="w-full max-h-96 object-cover rounded-2xl shadow-lg border-4 border-blue-200 mb-6"
                    />
                    {/* Course Info Section */}
                    <div className="w-full flex flex-col gap-2 items-start">
                        <h1 className="text-4xl font-extrabold text-blue-700 mb-1">{courseDetail.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{courseDetail.Category}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${courseDetail.payorFree === 'Free' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{courseDetail.payorFree}</span>
                            {courseDetail.payorFree === "Paid" ? (
                                <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 font-bold px-4 py-1 rounded-full shadow border border-yellow-300 text-lg">
                                    Rs. {courseDetail.price}
                                </span>
                            ) : null}
                        </div>
                        <span className="text-lg text-gray-600 mb-2">By <span className="font-bold text-blue-500">{courseDetail.teacher?.FullName}</span></span>
                        <p className="text-gray-700 text-base mt-2 mb-2">{courseDetail.description}</p>
                        {
                            disable == true ?
                            <button
                            onClick={()=>visitLectureMaterials()}
                            className="mt-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                        >
                            Lecture materials
                        </button> :
                            <button
                            onClick={()=>enroll()}
                            className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                        >
                            Enroll Now
                        </button>
                        }
                    </div>
                    {/* Lessons Section */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Course Lessons</h2>
                        <div className="grid gap-6">
                            {courseDetail.lessons?.length > 0 ? (
                                courseDetail.lessons.map((lesson, index) => (
                                    <div key={index} className="bg-blue-50 rounded-xl p-5 shadow flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-blue-600">{lesson.title}</h3>
                                        <p className="text-gray-700 text-sm">{lesson.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No lessons available for this course.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CourseDetailsPage
