import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import classes from '../../assets/classes.png';
import teachers from '../../assets/teachers.png';
import students from '../../assets/students.png';
import staff from '../../assets/staff.png';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllClassesApi} from "../../redux/api/GetAllClasses.js";
import {getAllTeachersApi} from "../../redux/api/GetAllTeachers.js";
import {getAllStaffApi} from "../../redux/api/GetAllStaff.js";
import {getAllStudentsApi} from "../../redux/api/GetAllStudents.js";
import {toast} from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllClassesApi());
        dispatch(getAllTeachersApi());
        dispatch(getAllStaffApi())
        dispatch(getAllStudentsApi())
    }, []);

    const teacherData = useSelector((state) => state.getAllTeachersSlice);
    const studentData = useSelector((state) => state.getAllStudentsSlice);
    const classData = useSelector((state) => state.getAllClassesSlice);
    const staffData = useSelector((state) => state.getAllStaffSlice);
    return (
        <AdminDashboard>
            <div
                className={'mx-auto grid grid-cols-2 md:flex items-center justify-center md:gap-x-3 h-auto gap-3 mt-5 md:h-[80vh]'}>
                <div
                    className={'w-44 h-36 bg-white shadow-lg border-b-2 rounded flex flex-col items-center justify-center'}>
                    <img src={students}/>
                    <h1 className={'text-lg font-semibold mt-1'}>Total Students</h1>
                    <h1 className={'text-lg font-semibold text-green-500'}>{studentData.data?.length}</h1>
                </div>
                <div
                    className={'w-44 h-36 bg-white shadow-lg border-b-2 rounded flex flex-col items-center justify-center'}>
                    <img src={teachers}/>
                    <h1 className={'text-lg font-semibold mt-1'}>Total Teachers</h1>
                    <h1 className={'text-lg font-semibold text-green-500'}>{teacherData.data?.length}</h1>
                </div>
                <div
                    className={'w-44 h-36 bg-white shadow-lg border-b-2 rounded flex flex-col items-center justify-center'}>
                    <img src={classes}/>
                    <h1 className={'text-lg font-semibold mt-1'}>Total Classes</h1>
                    <h1 className={'text-lg font-semibold text-green-500'}>{classData.data?.length}</h1>
                </div>
                <div
                    className={'w-44 h-36 bg-white shadow-lg border-b-2 rounded flex flex-col items-center justify-center'}>
                    <img src={staff}/>
                    <h1 className={'text-lg font-semibold mt-1'}>Total Staff</h1>
                    <h1 className={'text-lg font-semibold text-green-500'}>{staffData.data?.length}</h1>
                </div>
            </div>
        </AdminDashboard>
    );
}
export default Home;