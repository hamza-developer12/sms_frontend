import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSingleTeacherApi} from "../../redux/api/getSingleTeacherSlice.js";
import AttendanceSubMenu from "./AttendanceSubMenu.jsx";

const TeacherDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleTeacherApi(id))
    }, [])
    const {loading, data, error} = useSelector((state) => state.getSingleTeacherSlice);
    return (
        <AdminDashboard>
            <AttendanceSubMenu id={id}>
                <div className={' flex items-center justify-center flex-col mt-10'}>
                    <div className={'  text-center text-xl font-semibold'}>
                        <h1>Teacher Name: {data.name}</h1>
                        <h1>Father Name: {data.fatherName}</h1>
                        <h1>Email: {data.email}</h1>
                        <h1>Phone Number: {data.phoneNumber}</h1>
                        <h1>Cnic: {data.cnic}</h1>
                        <h1>Blood Group: {data.bloodGroup}</h1>
                    </div>
                </div>
            </AttendanceSubMenu>
        </AdminDashboard>
    );
}

export default TeacherDetails;