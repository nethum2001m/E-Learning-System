import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Quiz = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [result, setResult] = useState(null)
    const [studentId,setStudentId] = useState()
    const [quiz, setQuiz] = useState(null)
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState('')
    const getQuizUrl = `http://localhost:8000/api/student/getQuiz/${id}`
    const validateAuthUrl = 'http://localhost:8000/api/student/verifyStudentToken'
    const submitQuizUrl = `http://localhost:8000/api/student/submitQuiz`

    useEffect(() => {
        const token = localStorage.getItem("token")
        const getQuiz = async () => {
            try {
                const userdetails = await axios.post(validateAuthUrl, null, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setStudentId(userdetails.data.userid)
                const quizRes = await axios.get(getQuizUrl, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setQuiz(quizRes.data.Quiz)
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    navigate('/')
                } else {
                    setError(err.response?.data?.message || err.response?.data?.error || err.message)
                }
            }
        }
        getQuiz()
    }, [navigate])

    const handleAnswer = (qIndex, optIndex) => {
        const updatedAnswers = [...answers]
        updatedAnswers[qIndex] = optIndex
        setAnswers(updatedAnswers)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            const score = await axios.post(submitQuizUrl,{
              quizId:id,
              studentId:studentId,
              answers:answers
            },{
              headers:{
                'Authorization':`Bearer ${token}`,
              }
            })
            console.log(score.data.score)
            setResult({
                score: score.data.score,
                total: quiz ? quiz.questions.length : 0
            })
        } catch (err) {
            console.log(err.response?.data?.message || err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📘 Quiz</h2>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                        {error}
                    </div>
                )}

                {quiz && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-700">{quiz.title}</h3>
                            <p className="text-gray-600 mt-2">{quiz.description}</p>
                        </div>

                        {quiz.questions.map((q, qIndex) => (
                            <div
                                key={qIndex}
                                className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <p className="font-medium mb-4 text-gray-800">
                                    {qIndex + 1}. {q.questionText}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {q.options.map((opt, optIndex) => {
                                        // Determine style based on submission
                                        let bgClass = "border-gray-300"
                                        if(result){
                                            if(optIndex === q.correctAnswer) bgClass = "border-green-500 bg-green-100"
                                            else if(answers[qIndex] === optIndex) bgClass = "border-red-500 bg-red-100"
                                        }
                                        return (
                                            <label
                                                key={optIndex}
                                                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition ${bgClass}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${qIndex}`}
                                                    value={optIndex}
                                                    onChange={() => handleAnswer(qIndex, optIndex)}
                                                    className="h-5 w-5 text-blue-600"
                                                    required={!result}
                                                    disabled={!!result} // disable after submission
                                                />
                                                <span className="text-gray-700">{opt}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}

                        {!result && (
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
                                >
                                    ✅ Submit Quiz
                                </button>
                            </div>
                        )}
                    </form>
                )}

                {result && (
                    <div className="mt-8 p-6 rounded-2xl bg-green-100 text-green-700 border border-green-300 text-center text-lg font-medium shadow-md">
                        ✅ You scored {result.score} out of {result.total}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Quiz
