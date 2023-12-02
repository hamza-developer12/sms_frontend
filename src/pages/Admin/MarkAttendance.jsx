import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import AttendanceSubMenu from "./AttendanceSubMenu.jsx";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {markAttendanceApi} from "../../redux/api/MarkAttendanceSlice.js";

const MarkAttendance = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        let status = e.target.status.value;
        let date = e.target.date.value;
        if (status === '') {
            toast.error('Please select attendance status')
        }
        let apiData = {id, status, date}
        dispatch(markAttendanceApi(apiData))
    }
    return (
        <AdminDashboard>
            <AttendanceSubMenu id={id}>
                <div className={'w-full h-[80%] mt-8 flex items-center justify-center'}>

                    <form onSubmit={handleSubmit}
                          className={'flex items-center justify-center flex-col md:w-[40%] lg:w-[30%] w-full mx-2 md:mx-0'}>
                        <h1 className={' text-lg md:text-3xl w-full text-center my-2 font-bold'}>Mark Attendance</h1>
                        <select className={'my-4 w-full p-3 bg-white text-center rounded my-4'} name={'status'}>
                            <option value={''}>Select A Value</option>
                            <option value={'Present'}>Present</option>
                            <option value={'Absent'}>Absent</option>
                        </select>
                        <input type={'date'} name={'date'} className={'w-full p-3 rounded text-center'}/>
                        <button className={'my-4 w-full bg-blue-500 p-3 text-white rounded'}>Mark</button>
                        <button className={'my-2 w-full text-blue-500 bg-white p-3 border-2 border-blue-500 rounded'}
                                onClick={() => {
                                    navigate(`/admin-dashboard/teachers/`)
                                }}>Go
                            Back
                        </button>
                    </form>
                </div>
            </AttendanceSubMenu>
        </AdminDashboard>
    );
}
export default MarkAttendance;