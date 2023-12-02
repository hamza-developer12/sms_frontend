import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllStaffApi} from "../../redux/api/GetAllStaff.js";
import {BsPersonAdd} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {deleteSubjectApi} from "../../redux/api/DeleteSubjectSlice.js";
import {getAllSubjectsApi} from "../../redux/api/GetAllSubjects.js";
import {deleteStaffApi} from "../../redux/api/DeleteStaffSlice.js";
import ReactPaginate from "react-paginate";

const StaffList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false)
    const [staffId, setStaffId] = useState('')
    const deletedData = useSelector((state) => state.deleteStaffSlice)
    useEffect(() => {
        dispatch(getAllStaffApi());
    }, [deletedData.data]);
    const {error, data, loading} = useSelector((state) => state.getAllStaffSlice)
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
            <div className={'w-full h-screen flex items-center justify-center'}>
                <h1 className={'text-lg '}>No Staff Member Added Yet</h1>
                <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                    'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/staff/add-staff')
                }}>
                    <BsPersonAdd size={25} color={'white'}/>
                </div>
            </div>
        </AdminDashboard>
    } else {

        return <AdminDashboard>
            <div>
                <div>
                    <div className={'w-full'}>
                        <table
                            className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                            <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-2 text-center">S.No</th>
                                <th className="px-4 py-2 text-center">Person Name</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item._id} className="bg-white">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">{item.name}</td>
                                    <td className="px-4 py-2 text-center flex items-center justify-center gap-x-2">
                                        <button className={'bg-blue-500 px-2 py-1 rounded text-white'} onClick={() => {
                                            navigate(`/admin-dashboard/staff/${item._id}`)
                                        }}>View
                                        </button>
                                        <button className={'bg-red-500 px-2 py-1 rounded text-white'} onClick={() => {
                                            setPopup(true);
                                            setStaffId(item._id)
                                        }}>Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div
                            className={`absolute lg:top-[40%] lg:left-[35%] left-[25%] top-[30%] w-[70%] lg:w-[30%] h-[40%] bg-gray-100 ${
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
                                        dispatch(deleteStaffApi(staffId)).then(() => {
                                            dispatch(getAllStaffApi())
                                        })
                                        setPopup(false);
                                        setStaffId('')
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="py-1 px-5 rounded bg-purple-500 text-white"
                                    onClick={() => {
                                        setPopup(false);
                                        setStaffId('');
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'absolute bottom-10 right-10 rounded-full p-3 ' +
                'bg-blue-500 flex items-center justify-center  hover:cursor-pointer'} onClick={() => {
                navigate('/admin-dashboard/staff/add-staff')
            }}>
                <BsPersonAdd size={25} color={'white'}/>
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

export default StaffList;