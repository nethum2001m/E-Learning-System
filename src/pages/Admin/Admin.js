import React, { use, useEffect, useState } from 'react';
import { FaUsers, FaBook, FaClipboardList, FaChalkboardTeacher, FaPlus, FaBullhorn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
  const url = "http://localhost:8000/api/admin/verifyadmintoken"
  useEffect(()=>{
    const token = localStorage.getItem("token");
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
  const stats = [
    { title: 'Total Users', value: 350, icon: <FaUsers size={24} color="#fff" /> },
    { title: 'Courses', value: 25, icon: <FaBook size={24} color="#fff" /> },
    { title: 'Pending Assignments', value: 40, icon: <FaClipboardList size={24} color="#fff" /> },
    { title: 'Active Teachers', value: 12, icon: <FaChalkboardTeacher size={24} color="#fff" /> },
  ];

  const recentActivities = [
    { user: 'Alice Johnson', action: 'Registered as a Student', time: '2 hours ago' },
    { user: 'Mark Smith', action: 'Created a new Course', time: '1 day ago' },
    { user: 'Jane Doe', action: 'Submitted Assignment 5', time: '3 days ago' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 20 }}
        style={{ width: '250px', background: '#1e293b', color: '#fff', padding: '2rem 1rem' }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2563eb' }}>EduSphere Admin</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Dashboard</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Users</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Courses</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Assignments</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Settings</li>
          </ul>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2563eb',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1rem 2rem',
              borderRadius: '8px',
              background: '#fff',
              display: 'inline-block',
            }}
          >
            Admin Dashboard
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
              style={{
                flex: '1 1 200px',
                background: '#2563eb',
                color: '#fff',
                padding: '1.5rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{stat.title}</p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</h2>
              </div>
              <div>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              flex: '1 1 150px',
              padding: '1rem',
              background: '#10b981',
              color: '#fff',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaPlus /> Add User
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              flex: '1 1 150px',
              padding: '1rem',
              background: '#f59e42',
              color: '#fff',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaChalkboardTeacher /> Add Course
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              flex: '1 1 150px',
              padding: '1rem',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaBullhorn /> Send Announcement
          </motion.button>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Activities</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentActivities.map((activity, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.02, background: '#fef3c7', borderRadius: '8px' }}
                transition={{ duration: 0.2 }}
                style={{ padding: '0.8rem 0', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
              >
                <p><strong>{activity.user}</strong> - {activity.action}</p>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{activity.time}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default AdminDashboard;
