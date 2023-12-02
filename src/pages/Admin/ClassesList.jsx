import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import SubMenu from "./SubMenu.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllClassesApi} from "../../redux/api/GetAllClasses.js";
import {useNavigate} from "react-router-dom";
import {deleteClassApi} from "../../redux/api/DeleteClassSlice.js";
import ReactPaginate from "react-paginate";

const ClassesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [popup, setPopup] = useState(false)
    const [classId, setClassId] = useState('')
    const deletedData = useSelector((state) => state.deleteStudentSlice)


    useEffect(() => {
        dispatch(getAllClassesApi());
    }, [deletedData.data]);

    const {error, data, loading} = useSelector((state) => state.getAllClassesSlice)
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
            <div>
                <SubMenu>
                    <div className={'w-full h-[80vh] flex items-center justify-center'}>
                        <h1 className={'text-lg '}>No Class Added Yet</h1>
                    </div>
                </SubMenu>
            </div>
        </AdminDashboard>

    } else {
        return (
            <AdminDashboard>
                <div>
                    <SubMenu>
                        <div>
                            <div className={'w-full'}>
                                <table
                                    className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                                    <thead className="bg-black text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-center">S.No</th>
                                        <th className="px-4 py-2 text-center">Class Name</th>
                                        <th className="px-4 py-2 text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={item._id} className="bg-white">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.className}</td>
                                            <td className="px-4 py-2 text-center flex items-center justify-center gap-x-2">
                                                <button className={'bg-green-800 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            navigate(`/admin-dashboard/class/${item._id}`)
                                                        }}>View
                                                </button>

                                                <button className={'bg-red-500 px-2 py-1 rounded text-white'}
                                                        onClick={() => {
                                                            setClassId(item._id)
                                                            setPopup(true)
                                                        }}>Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div
                                    className={`absolute lg:top-[40%] left-[25%] lg:left-[35%] top-[30%] w-[70%] lg:w-[30%] h-[40%] bg-gray-100 ${
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
                                                dispatch(deleteClassApi(classId)).then(() => {
                                                    dispatch(getAllClassesApi())
                                                })
                                                setPopup(false);

                                                setClassId('')

                                            }}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className="py-1 px-5 rounded bg-purple-500 text-white"
                                            onClick={() => {
                                                setPopup(false);
                                                setClassId('');
                                            }}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SubMenu>
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
        );
    }
}

export default ClassesList;