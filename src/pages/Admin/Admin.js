import React, { useEffect, useState } from 'react';
import { FaUsers, FaBook, FaClipboardList, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList, Cell } from 'recharts';

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [monthlyRevenue,setMonthlyRevenue] = useState([])
  const [totalCourses, setTotalCourses] = useState(0);
  const [monthlyEnrollments, setMonthlyEnrollments] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();
  const url = "http://localhost:8000/api/admin/verifyadmintoken";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTeacherId = async () => {
      await axios.post(url, null, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setAdminId(res.data.userid);

          const getTotalStudents = async () => {
            await axios.get("http://localhost:8000/api/admin/studentCount", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setTotalStudents(res.data.studentCount))
              .catch(console.log);
          };
          const getTotalTeachers = async () => {
            await axios.get("http://localhost:8000/api/admin/teachersCount", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setTotalTeachers(res.data.teachersCount))
              .catch(console.log);
          };
          const getTotalMonthRevenue = async () => {
            await axios.get("http://localhost:8000/api/admin/getMonthRevenue", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setMonthRevenue(res.data.totalRevenue))
              .catch(console.log);
          };
          const getTotalCourses = async () => {
            await axios.get("http://localhost:8000/api/admin/getTotalCourse", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setTotalCourses(res.data.courseCount))
              .catch(console.log);
          };
          const getMonthlyEnrollments = async () => {
            await axios.get("http://localhost:8000/api/admin/getMonthlyEnrollments", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setMonthlyEnrollments(res.data.monthlyEnrollments))
              .catch(console.log);
          };
          const getMonthlyRevenue = async() =>{
            await axios.get("http://localhost:8000/api/admin/getMonthlyRevenue", { headers: { Authorization: `Bearer ${token}` } })
              .then((res) => setMonthlyRevenue(res.data.monthlyRevenue))
              .catch(console.log);
          }
          getTotalStudents();
          getTotalTeachers();
          getTotalMonthRevenue();
          getTotalCourses();
          getMonthlyEnrollments();
          getMonthlyRevenue()
        })
        .catch(() => navigate("/"));
    };
    getTeacherId();
  }, [navigate]);

  const stats = [
    { title: 'Total Students', value: totalStudents, icon: <FaUsers size={24} color="#fff" /> },
    { title: 'Total Teachers', value: totalTeachers, icon: <FaBook size={24} color="#fff" /> },
    { title: 'This Month Revenue', value: monthRevenue, icon: <FaClipboardList size={24} color="#fff" /> },
    { title: 'Total Courses', value: totalCourses, icon: <FaChalkboardTeacher size={24} color="#fff" /> },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Optional: gradient colors for bars
  const colors = ["#4f46e5", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#4338ca", "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      <main style={{ flex: 1, padding: '2rem' }}>
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '1rem 2rem', borderRadius: '8px', background: '#fff', display: 'inline-block' }}>
            Admin Dashboard
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {stats.map((stat, index) => (
            <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.2, duration: 0.5 }} whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }} style={{ flex: '1 1 200px', background: '#2563eb', color: '#fff', padding: '1.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{stat.title}</p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</h2>
              </div>
              <div>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Link to={'/admin/addUser'} style={{ flex: '1 1 150px', padding: '1rem', background: '#10b981', color: '#fff', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus /> Add User
          </Link>
        </motion.div>

        {/* Monthly Enrollment Bar Chart */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2563eb' }}>Monthly Enrollments</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={monthlyEnrollments}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={10} // space between bars
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }}/>
              <YAxis tick={{ fontSize: 12, fill: '#555' }}/>
              <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} />
              <Bar dataKey="enrollments" barSize={20} radius={[5, 5, 0, 0]}>
                {monthlyEnrollments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
                <LabelList dataKey="enrollments" position="top" fill="#2563eb" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Monthly Revenue Bar Chart */}
<div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2563eb' }}>Monthly Revenue</h2>
  <ResponsiveContainer width="100%" height={350}>
    <BarChart
      data={monthlyRevenue} // data from state
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      barGap={10} 
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }}/>
      <YAxis tick={{ fontSize: 12, fill: '#555' }}/>
      <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} formatter={(value) => `Rs ${value}`} />
      <Bar dataKey="revenue" barSize={20} radius={[5, 5, 0, 0]}>
        {monthlyRevenue.map((entry, index) => (
          <Cell key={`cell-revenue-${index}`} fill={colors[index % colors.length]} />
        ))}
        <LabelList dataKey="revenue" position="top" fill="#2563eb" fontSize={12} formatter={(value) => `Rs${value}`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

      </main>
    </motion.div>
  );
};

export default AdminDashboard;
