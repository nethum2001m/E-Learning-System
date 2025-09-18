import React, { useState } from 'react';
import { FaChalkboardTeacher, FaUsers, FaBook, FaClipboardList, FaPlus, FaBullhorn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const stats = [
    { title: 'Total Students', value: 120, icon: <FaUsers size={24} color="#fff" /> },
    { title: 'Courses Assigned', value: 8, icon: <FaBook size={24} color="#fff" /> },
    { title: 'Pending Assignments', value: 15, icon: <FaClipboardList size={24} color="#fff" /> },
  ];

  const recentActivities = [
    { student: 'Alice Johnson', activity: 'Submitted Assignment 3', time: '2 hours ago' },
    { student: 'Mark Smith', activity: 'Joined your course', time: '1 day ago' },
    { student: 'Jane Doe', activity: 'Completed Quiz 2', time: '3 days ago' },
  ];

  const upcomingClasses = [
    { course: 'Math 101', time: 'Today 10:00 AM' },
    { course: 'Physics 201', time: 'Today 2:00 PM' },
    { course: 'Chemistry 301', time: 'Tomorrow 11:00 AM' },
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
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#f59e42' }}>EduSphere</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Dashboard</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Courses</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Assignments</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Students</li>
            <li style={{ marginBottom: '1rem', cursor: 'pointer' }}>Profile</li>
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
              color: '#f59e42',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1rem 2rem',
              borderRadius: '8px',
              background: '#fff',
              display: 'inline-block',
            }}
          >
            Welcome, Teacher!
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
                background: '#f59e42',
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
            <FaPlus /> Create Assignment
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

          <motion.button
            onClick={() => setShowModal(true)}
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
            <FaChalkboardTeacher /> Create Course
          </motion.button>
        </motion.div>

        {/* Upcoming Classes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '2rem' }}
        >
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>Upcoming Classes</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {upcomingClasses.map((cls, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.02, background: '#dbeafe', borderRadius: '8px' }}
                transition={{ duration: 0.2 }}
                style={{ padding: '0.8rem 0', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
              >
                <p><strong>{cls.course}</strong> - {cls.time}</p>
              </motion.li>
            ))}
          </ul>
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
                <p><strong>{activity.student}</strong> - {activity.activity}</p>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{activity.time}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Create Course Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '400px', position: 'relative' }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Create Course</h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Course Name" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
                <textarea placeholder="Description" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
                <input type="text" placeholder="Schedule (e.g., Mon 10AM)" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 'bold' }}>Cancel</button>
                  <button type="submit" style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', background: '#10b981', color: '#fff', fontWeight: 'bold' }}>Create</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default TeacherDashboard;

