import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSingleClassApi} from "../../redux/api/GetSingleClass.js";

const ClassDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getSingleClassApi(id))
    }, []);
    const {loading, data, error} = useSelector((state) => state.getSingleClassSlice)

    return <AdminDashboard>
        <div className={'flex flex-col items-center justify-center mt-10 '}>
            <h1 className={'text-3xl font-semibold'}>Class Details</h1>
            <div className={'mt-10'}>
                <h1 className={'text-lg text-center font-semibold'}>Total Students in
                    class: {Array.isArray(data?.students) ? data.students.length : '0'}</h1>
                <h1 className={'text-lg text-center font-semibold'}>Total Subjects in
                    class: {Array.isArray(data?.subjects) ? data.subjects.length : '0'}</h1>
                <div className={'flex items-center justify-center gap-x-3 '}>
                    <button className={'px-3 py-4 bg-green-800 text-white rounded shadow-lg my-2 mx-2'}
                            onClick={() => {
                                navigate('/admin-dashboard/students/add-student')
                            }}>Add Student
                    </button>
                    <button className={'px-3 py-4 bg-blue-800 text-white rounded shadow-lg my-2 mx-2'}
                            onClick={() => {
                                navigate('/admin-dashboard/subjects/add-subjects')
                            }}>Add Subject
                    </button>
                </div>
            </div>
        </div>
    </AdminDashboard>
}
export default ClassDetails