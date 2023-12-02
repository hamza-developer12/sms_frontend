import StudentDashboard from "../../DashboardLayout/StudentDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getStudentTestsApi} from "../../redux/api/GetStudentTestsSlice.js";
import ReactPaginate from "react-paginate";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {studentMarksApi} from "../../redux/api/StudentMarksSlice.js";


const QuizzesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudentTestsApi())
        dispatch(studentMarksApi())
    }, []);
    const {loading, data, error} = useSelector((state) => state.getStudentTestsSlice)
    const items = data.existingQuiz;
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 5;
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if (Array.isArray(items)) {

            setCurrentItems(items.slice(itemOffset, endOffset));
        }
    }, [itemOffset, items]);

    let pageCount = Array.isArray(items) ? Math.ceil(items.length / itemsPerPage) : 0;

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };
    const markResult = () => {
        items?.map((item) => console.log(item._id))
    }

    if (loading) {
        return (
            <StudentDashboard>
                <div className={'w-full h-[80vh] flex items-center justify-center'}>
                    <h1 className={'text-2xl'}>Loading...</h1>
                </div>
            </StudentDashboard>
        );
    }
    if (data?.existingQuiz?.length === 0) {
        if (loading) {
            return (
                <StudentDashboard>
                    <div className={'w-full h-[80vh] flex items-center justify-center'}>
                        <h1 className={'text-2xl'}>No Result Yet</h1>
                    </div>
                </StudentDashboard>
            );
        }
    }
    return (
        <StudentDashboard>
            <div>
                <div className={'w-full'}>
                    <table
                        className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                        <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">S.No</th>
                            <th className="px-4 py-2 text-center">Quiz</th>
                            <th className="px-4 py-2 text-center">Quiz Date</th>
                            <th className="px-4 py-2 text-center">Total Marks</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (

                            <tr key={item._id} className="bg-white">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 text-center">{item.subjectName?.subjectName}</td>
                                <td className="px-4 py-2 text-center">{moment(item.quizDate).format("MMM Do YY")}</td>
                                <td className="px-4 py-2 text-center">{item.totalMarks}</td>
                                <td className={'flex items-center justify-center'}>
                                    {
                                        data.existingStudent.quizzes.includes(item._id) || Date.now() > item.quizDate ?
                                            <>
                                                <h1 className={'px-2 py-1'}>Attempted</h1>
                                            </>
                                            :
                                            <>
                                                <button
                                                    //disabled={Date.now() !== item.quizDate ? true : false}
                                                    onClick={() => {
                                                        // navigate(`/student-dashboard/attempt-quiz/${item._id}`)
                                                        window.location.href = `/student-dashboard/attempt-quiz/${item._id}`;
                                                    }}
                                                    className={'bg-blue-500 px-2 py-1 mt-1 mb-1 rounded text-white'}>Attempt
                                                </button>
                                            </>
                                    }
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-x-2 justify-center text-lg my-4"
                pageClassName="text-purple-500 px-2"
                activeClassName="text-purple-800 bg-gray-100"
                nextLinkClassName="text-purple-500"
                previousLinkClassName="text-purple-500"
            />
        </StudentDashboard>
    );
}
export default QuizzesList;