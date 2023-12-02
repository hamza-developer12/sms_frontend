import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import SubMenu from "./SubMenu.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllTeachersApi} from "../../redux/api/GetAllTeachers.js";
import {BsFillClipboardPlusFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {deleteClassApi} from "../../redux/api/DeleteClassSlice.js";
import {getAllClassesApi} from "../../redux/api/GetAllClasses.js";
import {deleteTeacherApi} from "../../redux/api/DeleteTeacherSlice.js";
import ReactPaginate from "react-paginate";

const TeachersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false)
    const [teacherId, setTeacherId] = useState('')

    const deletedData = useSelector((state) => state.deleteTeacherSlice)

    useEffect(() => {
        dispatch(getAllTeachersApi());
    }, [deletedData.data]);

    const {error, data, loading} = useSelector((state) => state.getAllTeachersSlice)
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
            <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                navigate('/admin-dashboard/teachers/add-teacher')
            }}>
                <BsFillClipboardPlusFill size={25} color={'white'}/>
            </div>
            <div className={'w-full h-screen flex items-center justify-center'}>
                <h1 className={'text-lg '}>No Teachers Added Yet</h1>
            </div>
        </AdminDashboard>
    } else {

        return <AdminDashboard>
            <div>
                <div>
                    <div className={'w-full overflow-scroll'}>
                        <table
                            className="border overflow-scroll border-black mx-auto w-auto md:w-[800px] lg:w-[1050px]  mt-2">
                            <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-center">S.No</th>
                                <th className="px-4 py-2 text-center">Teacher Name</th>
                                <th className="px-4 py-2 text-center">Teacher Email</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className={'overflow-scroll'}>
                            {currentItems.map((item, index) => (
                                <tr key={item._id} className="bg-white">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{item.name}</td>
                                    <td className="px-4 py-2 text-center">{item.email}</td>
                                    <td className="px-4 py-2 text-center flex items-center flex-col md:flex-row justify-center gap-x-2">
                                        <button className={'bg-green-800 px-2 py-1 rounded text-white'} onClick={() => {
                                            navigate(`/admin-dashboard/teachers/${item._id}`)
                                        }}>View
                                        </button>
                                        <button className={'bg-red-500 px-2 py-1 rounded text-white'} onClick={() => {
                                            setPopup(true)
                                            setTeacherId(item._id)
                                        }}>Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div
                            className={`absolute lg:top-[40%] left-[35%] top-[30%] w-[70%] lg:w-[30%] h-[40%] bg-gray-100 ${
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
                                        dispatch(deleteTeacherApi(teacherId)).then(() => {
                                            dispatch(getAllTeachersApi())
                                        })
                                        setPopup(false);

                                        setTeacherId('')

                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="py-1 px-5 rounded bg-purple-500 text-white"
                                    onClick={() => {
                                        setPopup(false);
                                        setTeacherId('');
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                        'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                        navigate('/admin-dashboard/teachers/add-teacher')
                    }}>
                        <BsFillClipboardPlusFill size={25} color={'white'}/>
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

export default TeachersList;