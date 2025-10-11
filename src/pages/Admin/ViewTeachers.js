import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Search } from 'lucide-react';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 8;

  const url = "http://localhost:8000/api/admin/verifyadmintoken";
  const teachersUrl = "http://localhost:8000/api/admin/getTeachers";
  const deleteUrl = "http://localhost:8000/api/admin/deleteTeachers"; // backend delete endpoint
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAllTeachers = async () => {
      await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        const getTeachers = async () => {
          await axios.get(teachersUrl, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            setTeachers(res.data.teachers)
          }).catch((err) => {
            console.log(err);
          });
        };
        getTeachers();
      }).catch((err) => {
        navigate('/');
      });
    };

    getAllTeachers();
  }, [navigate]);

  // Delete teacher
  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${deleteUrl}`,{
            teacherId:teacherId
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers((prev) => prev.filter((t) => t._id !== teacherId));
      alert("Teacher deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete teacher!");
    }
  };

  

  // Search filter
  const filteredTeachers = teachers.filter(
    (t) =>
      t.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.phoneNumber || '').includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Registered Teachers</h1>

      {/* Search input */}
      <div className="mb-4 flex items-center gap-2 w-full sm:w-1/2 bg-white p-2 rounded-lg border border-gray-300 shadow-sm">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="w-full outline-none bg-transparent text-gray-700"
        />
      </div>

      {currentTeachers.length === 0 ? (
        <p className="text-gray-600 text-lg">No teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher) => (
                <tr key={teacher._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4">{teacher.FullName}</td>
                  <td className="py-3 px-4">{teacher.email}</td>
                  <td className="py-3 px-4">{teacher.phoneNumber || "N/A"}</td>
                  <td className="py-3 px-4">{teacher.address || "N/A"}</td>
                  <td className="py-3 px-4">{new Date(teacher.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-center flex justify-center gap-3">
                    
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewTeachers;
