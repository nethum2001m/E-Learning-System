import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StudentDashboard = () => {
  const navigate = useNavigate()
  const url = "http://localhost:8000/api/student/verifyStudentToken"
  useEffect(()=>{
    const token = localStorage.getItem("token")
    //check authentication and athorization
    const getTeacherId = async () => {
      await axios
        .post(
          url,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
        })
        .catch(() => {
          navigate("/");
        });
    };
    getTeacherId();
  },[])
  
  return (
      <div>

      </div>
);
}

export default StudentDashboard;