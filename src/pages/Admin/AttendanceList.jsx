import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import AttendanceSubMenu from "./AttendanceSubMenu.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {attendanceRecordApi} from "../../redux/api/AttendanceRecordSlice.js";
import exportFromJSON from 'export-from-json'
import moment from "moment";

const AttendanceList = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(attendanceRecordApi(id))
    }, [])
    const {loading, data, error} = useSelector((state) => state.attendanceRecordSlice)
    const headers = [
        {label: "Month Name", key: "month"},
        {label: "Attendance", key: "attendance"},
        {label: "Date", key: "date"}
    ];

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

    // function getAttendanceStatus(item) {
    //     if (item.attendanceStatus.length === 0) {
    //         console.log('no record')
    //     }
    //     item.attendanceStatus.forEach((i) => {
    //         console.log(i)
    //     })
    // }

    const itemData = (attendance, date, month) => {
        const fileName = month + " Attendance";
        const exportType = exportFromJSON.types.csv;
        let destructureData;
        if (attendance.length !== 0 && date.length !== 0) {
            for (let i = 0; i < attendance.length; i++) {
                let sNo = 1;
                for (let j = 0; j < date.length; j++) {

                    destructureData = [
                        {
                            sno: sNo,
                            status: attendance[i],
                            date: date[j]
                        }
                    ]
                }
                sNo++;
            }
        } else {
            destructureData = [{
                error: "No Data Found"
            }]
        }
        exportFromJSON({data: destructureData, fileName, exportType})
    }

    if (loading) {
        return (
            <AdminDashboard>
                <AttendanceSubMenu id={id}>
                    <div className={'flex items-center justify-center w-full h-[80vh]'}>
                        <h1 className={'text-xl'}>Loading....</h1>
                    </div>
                </AttendanceSubMenu>
            </AdminDashboard>
        );
    }
    if (data.length === 0) {
        return (
            <AdminDashboard>
                <AttendanceSubMenu id={id}>
                    <div className={'flex items-center justify-center w-full h-[80vh]'}>
                        <h1 className={'text-xl'}>No Attendance List Created Yet</h1>
                    </div>
                </AttendanceSubMenu>
            </AdminDashboard>
        );
    }
    return (
        <AdminDashboard>
            <AttendanceSubMenu id={id}>
                <table
                    className="border border-black mx-auto w-auto sm:w-[500px] md:w-[800px] lg:w-[1050px]  mt-2">
                    <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 py-2 text-center">S.No</th>
                        <th className="px-4 py-2 text-center">Month Name</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item._id} className="bg-white">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{item.month}</td>
                            <td className="px-4 py-2 text-center">
                                <button className={'bg-blue-500 text-white p-2 rounded'}
                                        onClick={() => {
                                            itemData(item?.attendanceStatus, moment(item?.date).format("MMM Do YY"), item.month)
                                        }}>Download
                                </button>
                                <button className={'ml-2 bg-green-700 text-white p-2 rounded'}
                                        onClick={() => {
                                            navigate(`/admin-dashboard/teachers/teacher-attendance/${item._id}`)
                                        }}>Mark Attendance
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </AttendanceSubMenu>
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

export default AttendanceList;