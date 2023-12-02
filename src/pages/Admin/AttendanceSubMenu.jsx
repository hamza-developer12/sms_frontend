import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate} from "react-router-dom";

const AttendanceSubMenu = ({children, id}) => {
    const navigate = useNavigate();
    return (
        <div>
            <ul className={'flex items-center gap-x-2 '}>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/teachers/${id}`)
                }}>Details
                </li>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/teachers/create-attendance-sheet/${id}`)
                }}>Create Attendance Sheet
                </li>

                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate(`/admin-dashboard/teacher/attendance-details/${id}`)
                }}>Attendance List
                </li>
            </ul>
            {children}
        </div>
    );
}
export default AttendanceSubMenu;