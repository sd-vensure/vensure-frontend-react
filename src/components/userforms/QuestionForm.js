import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../axiosapi';
import { useNavigate } from 'react-router-dom';

const QuestionForm = () => {

    const [question, setQuestion] = useState('');
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., sending data to an API)
        let finalquestion = question.trim();
        if (finalquestion == "" || finalquestion == null) {
            toast.info("Please provide a valid question");
            return;
        }

        try {

            let insertdata = await api.post("/userform/addquery", { "question": finalquestion })

            if (insertdata.data.status) {
                toast.success(insertdata.data.message);
                navigate("/")
            }
            else {
                toast.info(insertdata.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    };


    return (
        <div className="flex justify-center mt-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-center mb-4">Ask a Query</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Your Question</label>
                        <textarea
                            id="question"
                            name="question"
                            rows="4"
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Submit Question
                    </button>
                </form>
            </div>
        </div>
    )
}

export default QuestionForm
