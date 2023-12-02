import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllStudentsApi} from "../../redux/api/GetAllStudents.js";
import ReactPaginate from "react-paginate";
import {deleteStudentApi} from "../../redux/api/DeleteStudentSlice.js";
import {BsPersonAdd} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {getResult, searchResult} from "../../redux/api/GetSearchResultSlice.js";


const StudentsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false)
    const [studentId, setStudentId] = useState('');
    const deleteStudent = useSelector((state) => state.deleteStudentSlice);
    useEffect(() => {
        dispatch(getAllStudentsApi());


    }, [deleteStudent.data]);


    const {error, data, loading} = useSelector((state) => state.getAllStudentsSlice)

    const items = data;
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        if (Array.isArray(items)) {

            setCurrentItems(items.slice(itemOffset, endOffset));
        }

        dispatch(getResult(data))
    }, [itemOffset, items]);

    let pageCount = Array.isArray(items) ? Math.ceil(items.length / itemsPerPage) : 0;
    const searchQueryResult = useSelector((state) => state.getSearchResultSlice);
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };
    if (loading) {
        return <AdminDashboard>

            <h1>Loading....</h1>
        </AdminDashboard>
    }
    if (error !== null || error) {
        return (
            <AdminDashboard>
                <h1>{error}</h1>
            </AdminDashboard>
        );
    }
    if (data.length === 0) {
        return <AdminDashboard>
            <div className={'w-full h-screen flex items-center justify-center'}>
                <h1 className={'text-lg '}>No Student Added Yet</h1>
                <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                    'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/students/add-student')
                }}>
                    <BsPersonAdd size={25} color={'white'}/>
                </div>
            </div>
        </AdminDashboard>
    } else {

        return <AdminDashboard>
            <div>
                <div>
                    <div className={'w-full flex items-center justify-center'}>
                        <input
                            type="search"
                            placeholder="Search Specific Student By Roll Number"
                            className="w-[50%] mx-auto outline-none border border-gray-500 shadow-lg mt-4 p-4  bg-gray-100 rounded mb-4"
                            onChange={(e) => {
                                dispatch(searchResult(e.target.value));
                            }}
                        />
                    </div>
                    <div className={'w-auto overflow-scroll'}>
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
                            {currentItems &&
                                (searchQueryResult.data.length === 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={item._id} className="bg-white">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.fullName}</td>
                                            <td className="px-4 py-2 text-center">{item.email}</td>
                                            <td className="px-4 py-2 text-center">{item.studentRollNumber}</td>
                                            <td className="px-4 py-2 text-center flex flex-col md:flex-row items-center justify-center gap-x-2">
                                                <button className={'bg-blue-500 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            navigate(`/admin-dashboard/students/${item._id}`)
                                                        }}>View
                                                </button>
                                                <button className={'bg-red-500 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            setPopup(true);
                                                            setStudentId(item._id);
                                                        }}>Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    searchQueryResult.data.map((item, index) => (
                                        <tr key={item._id} className="bg-white">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.fullName}</td>
                                            <td className="px-4 py-2 text-center">{item.email}</td>
                                            <td className="px-4 py-2 text-center">{item.studentRollNumber}</td>
                                            <td className="px-4 py-2 text-center flex flex-col md:flex-row items-center justify-center gap-x-2">
                                                <button className={'bg-blue-500 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            navigate(`/admin-dashboard/students/${item._id}`)
                                                        }}>View
                                                </button>
                                                <button className={'bg-red-500 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            setPopup(true);
                                                            setStudentId(item._id);
                                                        }}>Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    className={`absolute lg:top-[40%] left-[25%] lg:left-[40%] top-[30%] w-[70%] lg:w-[30%] h-[40%] bg-gray-100 ${
                        popup === false ? "hidden" : "block"
                    } shadow-lg rounded flex items-center justify-center flex-col duration-100`}
                >
                    <h1 className="text-center text-xl mt-2">
                        Are You Sure You Want To Remove
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <button
                            className="py-1 px-5 rounded bg-red-500 text-white"
                            onClick={() => {
                                dispatch(deleteStudentApi(studentId))
                                setPopup(false);
                                dispatch(getAllStudentsApi());
                                setStudentId('')
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="py-1 px-5 rounded bg-purple-500 text-white"
                            onClick={() => {
                                setPopup(false);
                                setStudentId('');
                            }}
                        >
                            No
                        </button>
                    </div>
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

            <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                navigate('/admin-dashboard/students/add-student')
            }}>
                <BsPersonAdd size={25} color={'white'}/>
            </div>
        </AdminDashboard>
    }
}

export default StudentsList;

// {
//     currentItems.map((item, index) => (
//         <tr key={item._id} className="bg-white">
//             <td className="px-4 py-2 text-center">{index + 1}</td>
//             <td className="px-4 py-2 text-center">{item.fullName}</td>
//             <td className="px-4 py-2 text-center">{item.email}</td>
//             <td className="px-4 py-2 text-center">{item.studentRollNumber}</td>
//             <td className="px-4 py-2 text-center flex flex-col md:flex-row items-center justify-center gap-x-2">
//                 <button className={'bg-blue-500 px-2 py-1 rounded text-white'} onClick={() => {
//                     navigate(`/admin-dashboard/students/${item._id}`)
//                 }}>View
//                 </button>
//                 <button className={'bg-red-500 px-2 py-1 rounded text-white'} onClick={() => {
//                     setPopup(true);
//                     setStudentId(item._id);
//                 }}>Delete
//                 </button>
//             </td>
//
//         </tr>
//     ))
// }