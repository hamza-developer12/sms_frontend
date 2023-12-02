import TeacherDashboard from "../../DashboardLayout/TeacherDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {getSingleStudentMarksApi} from "../../redux/api/GetSingleStudentMarksSlice.js";
import {useParams} from "react-router-dom";
import moment from "moment";

const StudentMarksDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleStudentMarksApi(id))
    }, [])

    const {loading, data, error} = useSelector((state) => state.getSingleStudentMarksSlice)
    const items = data.marks;
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
    if (loading) {
        return (
            <TeacherDashboard>
                <div className={'w-full h-[80vh] flex items-center justify-center'}>
                    <h1 className={'text-2xl'}>Loading...</h1>
                </div>
            </TeacherDashboard>
        );
    }
    if (data && data?.marks?.length === 0) {
        if (loading) {
            return (
                <TeacherDashboard>
                    <div className={'w-full h-[80vh] flex items-center justify-center'}>
                        <h1 className={'text-2xl'}>No Result Yet</h1>
                    </div>
                </TeacherDashboard>
            );
        }
    }
    return (
        <TeacherDashboard>
            <div>
                <div className={'w-full'}>
                    <h1 className={'text-center text-4xl my-4'}>Result</h1>
                    <table
                        className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                        <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-2 text-center">S.No</th>
                            <th className="px-4 py-2 text-center">Quiz</th>
                            <th className="px-4 py-2 text-center">Quiz Date</th>
                            <th className="px-4 py-2 text-center">Total Marks</th>
                            <th className="px-4 py-2 text-center">Obtained Marks</th>
                            <th className="px-4 py-2 text-center">Percentage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (

                            <tr key={item._id} className="bg-white">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 text-center">{item.quizName}</td>
                                <td className="px-4 py-2 text-center">{moment(item.quizDate).format("MMM Do YY")}</td>
                                <td className="px-4 py-2 text-center">{item.totalMarks}</td>
                                <td className="px-4 py-2 text-center">{item.marksObtained}</td>
                                <td className="px-4 py-2 text-center">{item.percentage}%</td>
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
        </TeacherDashboard>
    );
}
export default StudentMarksDetails;