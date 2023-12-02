import TeacherDashboard from "../../DashboardLayout/TeacherDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getTeacherStudentsApi} from "../../redux/api/GetTeacherStudentsSlice.js";
import ReactPaginate from "react-paginate";
import {useNavigate} from "react-router-dom";


const TeacherStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTeacherStudentsApi())
    }, []);
    const {loading, data, error} = useSelector((state) => state.getTeacherStudentsSlice)

    const items = data;
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
    return (
        <TeacherDashboard>
            <div className={'w-auto'}>
                <table
                    className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                    <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 py-2 text-center">S.No</th>
                        <th className="px-4 py-2 text-center">Student Name</th>
                        <th className="px-4 py-2 text-center">Student Email</th>
                        <th className="px-4 py-2 text-center">Roll No</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody className={'overflow-scroll'}>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="bg-white">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{item.fullName}</td>
                            <td className="px-4 py-2 text-center">{item.email}</td>
                            <td className="px-4 py-2 text-center">{item.studentRollNumber}</td>
                            <td className="px-4 py-2 text-center flex flex-col md:flex-row items-center justify-center gap-x-2">
                                <button className={'bg-blue-500 px-2 py-1 rounded text-white'} onClick={() => {
                                    navigate(`/teacher-dashboard/teacher-students/student-marks/${item._id}`)
                                }}>Results
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
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
export default TeacherStudents;