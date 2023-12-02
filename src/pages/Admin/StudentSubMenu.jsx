import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate, useParams} from "react-router-dom";
//this is the one
const StudentSubMenu = ({children}) => {
    const {id} = useParams()
    const navigate = useNavigate();
    return (
        <div>
            <ul className={'flex items-center gap-x-2 '}>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/students/${id}`)
                }}>Details
                </li>

                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/student/student-marks/${id}`)
                }}>Student Marks
                </li>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/student/add-subjects/${id}`)
                }}>Add Student Subjects
                </li>
            </ul>
            {children}
        </div>
    );
}
export default StudentSubMenu;