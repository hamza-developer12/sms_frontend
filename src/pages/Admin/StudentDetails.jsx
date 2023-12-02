import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getSingleStudentApi} from "../../redux/api/GetSingleStudentSlice.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import StudentSubMenu from "./StudentSubMenu.jsx";

const StudentDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleStudentApi(id))
    }, [])
    const {loading, data, error} = useSelector((state) => state.getSingleStudentSlice)

    return (
        <AdminDashboard>
            <StudentSubMenu id={id}>
                <div className={' mt-10 '}>
                    <h1 className={'text-3xl font-semibold text-center'}>Student Details</h1>
                    <div className={'mt-10 ml-10'}>
                        <h1 className={'text-lg font-semibold'}>Name: {data.fullName}</h1>
                        <h1 className={'text-lg font-semibold'}>Email: {data.email}</h1>
                        <h1 className={'text-lg font-semibold'}>Roll Number: {data.studentRollNumber}</h1>
                        <h1 className={'text-lg font-semibold'}>Gender: {data.gender}</h1>
                        <h1 className={'text-lg font-semibold'}>Class Name: {data?.className?.className}</h1>
                    </div>
                </div>
            </StudentSubMenu>
        </AdminDashboard>
    );
}
export default StudentDetails;