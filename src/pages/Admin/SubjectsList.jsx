import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import SubMenu from "./SubMenu.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllSubjectsApi} from "../../redux/api/GetAllSubjects.js";
import {BsFillClipboardPlusFill} from 'react-icons/bs';
import {BiBookAdd} from 'react-icons/bi';
import {useNavigate} from "react-router-dom";
import {deleteSubjectApi} from "../../redux/api/DeleteSubjectSlice.js";
import ReactPaginate from "react-paginate";

const SubjectsList = () => {
    const [popup, setPopup] = useState(false)
    const [subjectId, setSubjectId] = useState('');
    const deleteSubject = useSelector((state) => state.deleteSubjectSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSubjectsApi());
    }, [deleteSubject.data]);
    const {error, data, loading} = useSelector((state) => state.getAllSubjectsSlice)

    // Pagination code.......
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
    //Pagination code ends here

    // if (loading) {
    //     return <AdminDashboard>
    //
    //         <h1>Loading....</h1>
    //     </AdminDashboard>
    // }
    if (error !== null || error) {
        return (
            <AdminDashboard>
                <h1>{error}</h1>
            </AdminDashboard>
        );
    }
    if (data.length === 0) {
        return <AdminDashboard>
            <div className={'w-full h-[80vh] flex items-center justify-center'}>
                <h1 className={'text-lg '}>No Subjects Added Yet</h1>

                <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                    'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/subjects/add-subjects')
                }}>
                    <BiBookAdd size={25} color={'white'}/>
                </div>

            </div>
        </AdminDashboard>
    } else {

        return <AdminDashboard>
            <div>
                <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                    'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/subjects/add-subjects')
                }}>
                    <BiBookAdd size={25} color={'white'}/>
                </div>
                <div>
                    <div className={'w-full'}>
                        <table border={1}
                               className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                            <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-center">S.No</th>
                                <th className="px-4 py-2 text-center">Subject Name</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item._id} className="bg-white hover:bg-gray-400 hover:cursor-pointer">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{item.subjectName}</td>
                                    <td className="px-4 py-2 text-center flex items-center justify-center gap-x-2">
                                        <button className={'bg-green-800 px-2 py-1 rounded text-white'} onClick={() => {
                                            navigate(`/admin-dashboard/classes/${item.className}/subjects/${item._id}`)
                                        }}>View
                                        </button>
                                        <button className={'bg-red-500 px-2 py-1 rounded text-white'} onClick={() => {
                                            setPopup(true)
                                            setSubjectId(item._id)
                                        }}>Delete
                                        </button>
                                    </td>

                                </tr>
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
                                dispatch(deleteSubjectApi(subjectId))
                                setPopup(false);
                                dispatch(getAllSubjectsApi());
                                setSubjectId('')
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="py-1 px-5 rounded bg-purple-500 text-white"
                            onClick={() => {
                                setPopup(false);
                                setSubjectId('');
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
        </AdminDashboard>
    }
}

export default SubjectsList;