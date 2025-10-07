import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const submitUrl = "http://localhost:8000/api/teacher/createQuiz"
  const [course, setCourses] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [success,setSuccess] = useState('')
  const [error,setError] = useState('')
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let teacherID;

    const validateAuthAndFetchData = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/teacher/getteacherid',
          null,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        setTeacherId(res.data.teacherid);
        teacherID = res.data.teacherid;

        const response = await axios.get(
          `http://localhost:8000/api/course/all/${teacherID}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        setCourses(response.data);
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };

    validateAuthAndFetchData();
  }, [navigate]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  const handleSubmitFunction = async(e) => {
    const token = localStorage.getItem("token")
    e.preventDefault();
    await axios.post(submitUrl,{
        courseId,
        teacherId,
        title,
        description,
        questions
    },{
        headers:{
            'Authorization':`Bearer ${token}`,
        }
    }).then((res)=>{
        setCourseId('')
        setTitle('')
        setDescription('')
        setQuestions([
    { questionText: "", options: ["", "", "", ""], correctAnswer: 0 }
  ])
        setError('')
        setSuccess("Quiz added successfully")
    }).catch((err)=>{
        setSuccess('')
        setError('Quiz creation unsuccessful')
    })
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📘 Create a New Quiz</h2>

        <form onSubmit={handleSubmitFunction} className="space-y-6">
          {/* Course Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Course</label>
            <select
              onChange={(e) => setCourseId(e.target.value)}
              value={courseId}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose Course</option>
              {course.length > 0 &&
                course.map((c, idx) => (
                  <option key={idx} value={c._id}>
                    {c.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter quiz title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter quiz description"
            />
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions</h3>
            {questions.map((q, i) => (
              <div
                key={i}
                className="mb-6 p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50"
              >
                {/* Question Text */}
                <input
                  type="text"
                  value={q.questionText}
                  onChange={(e) => {
                    const newQ = [...questions];
                    newQ[i].questionText = e.target.value;
                    setQuestions(newQ);
                  }}
                  className="w-full mb-3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={`Question ${i + 1}`}
                  required
                />

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((opt, j) => (
                    <input
                      key={j}
                      value={opt}
                      onChange={(e) => {
                        const newQ = [...questions];
                        newQ[i].options[j] = e.target.value;
                        setQuestions(newQ);
                      }}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder={`Option ${j + 1}`}
                      required
                    />
                  ))}
                </div>

                {/* Correct Answer Select */}
                <div className="mt-3">
                  <label className="block text-gray-600 text-sm mb-1">Correct Answer</label>
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i].correctAnswer = Number(e.target.value);
                      setQuestions(newQ);
                    }}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value={0}>Option 1</option>
                    <option value={1}>Option 2</option>
                    <option value={2}>Option 3</option>
                    <option value={3}>Option 4</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full mt-2 bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              ➕ Add Another Question
            </button>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              ✅ Create Quiz
            </button>
          </div>
        </form>
        {success && (
  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
    {success}
  </div>
)}
{error && (
  <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
    {error}
  </div>
)}
      </div>
    </div>
  );
};

export default CreateQuiz;
