import AdminDashboard from "../DashboardLayout/AdminDashboard.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSingleClassApi} from "../redux/api/GetSingleClass.js";
import {getSingleSubjectApi} from "../redux/api/GetSingleSubject.js";

const SubjectDetails = () => {
    const {cid, id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    console.log(cid, id)
    useEffect(() => {
        dispatch(getSingleSubjectApi(id));
    }, []);
    const {loading, data, error} = useSelector((state) => state.getSingleSubjectSlice)
    return (
        <AdminDashboard>
            <div className={'flex flex-col items-center justify-center mt-10 '}>
                <h1 className={'text-3xl font-semibold'}>Subject Details</h1>
                <div className={'mt-10 flex flex-col items-center justify-center'}>
                    <h1 className={'text-lg text-center font-semibold'}>Subject Name: {data.subjectName}</h1>
                    <h1 className={'text-lg text-center font-semibold'}>Class Name: {data.className?.className}</h1>
                    <h1 className={'text-lg text-center font-semibold'}>Total Students Of This
                        Subject: {data.subjectStudents?.length}</h1>
                    
                </div>
            </div>
        </AdminDashboard>
    );
}
export default SubjectDetails;