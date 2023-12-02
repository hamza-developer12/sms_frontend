import {Navigate, Route, Routes} from "react-router-dom";
import AdminLogin from "../components/AdminLogin.jsx";
import StaffLogin from "../components/StaffLogin.jsx";
import TeacherLogin from "../components/TeacherLogin.jsx";
import StudentLogin from "../components/StudentLogin.jsx";
import Login from "../components/login.jsx";
import Home from "../pages/Admin/Home.jsx";
import ClassesList from "../pages/Admin/ClassesList.jsx";
import SubjectsList from "../pages/Admin/SubjectsList.jsx";
import AddClass from "../pages/Admin/AddClass.jsx";
import TeachersList from "../pages/Admin/TeachersList.jsx";
import StudentsList from "../pages/Admin/StudentsList.jsx";
import StaffList from "../pages/Admin/StaffList.jsx";
import AddSubjects from "../pages/AddSubjects.jsx";
import ClassDetails from "../pages/Admin/ClassDetails.jsx";
import AddStudent from "../pages/AddStudent.jsx";
import AddStaff from "../pages/Admin/AddStaff.jsx";
import AddTeacher from "../pages/AddTeacher.jsx";
import SubjectDetails from "../pages/SubjectDetails.jsx";
import StaffMemberDetails from "../pages/Admin/StaffMemberDetails.jsx";
import AddSubjectStudents from "../pages/Admin/AddSubjectStudents.jsx";
import UserDetails from "../pages/Admin/UserDetails.jsx";
import Logout from "../pages/Admin/Logout.jsx";
import MarkAttendance from "../pages/Admin/MarkAttendance.jsx";
import TeacherDetails from "../pages/Admin/TeacherDetails.jsx";
import CreateAttendanceSheet from "../pages/Admin/CreateAttendanceSheet.jsx";
import AttendanceList from "../pages/Admin/AttendanceList.jsx";
import StaffDashboard from "../DashboardLayout/StaffDashboard.jsx";
import TeacherDashboard from "../DashboardLayout/TeacherDashboard.jsx";

const AdminRoutes = () => {
    const user = localStorage.getItem('user')
    return (

        <Routes>
        </Routes>

    );
}

export default AdminRoutes;