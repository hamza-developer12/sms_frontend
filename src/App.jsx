import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// Toast Messages
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./components/AdminLogin.jsx";
import StaffLogin from "./components/StaffLogin.jsx";
import TeacherLogin from "./components/TeacherLogin.jsx";
import StudentLogin from "./components/StudentLogin.jsx";
import Login from "./components/login.jsx";
import Home from "./pages/Admin/Home.jsx";
import ClassesList from "./pages/Admin/ClassesList.jsx";
import SubjectsList from "./pages/Admin/SubjectsList.jsx";
import AddClass from "./pages/Admin/AddClass.jsx";
import TeachersList from "./pages/Admin/TeachersList.jsx";
import StudentsList from "./pages/Admin/StudentsList.jsx";
import StaffList from "./pages/Admin/StaffList.jsx";
import AddSubjects from "./pages/AddSubjects.jsx";
import ClassDetails from "./pages/Admin/ClassDetails.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import AddStaff from "./pages/Admin/AddStaff.jsx";
import AddTeacher from "./pages/AddTeacher.jsx";
import SubjectDetails from "./pages/SubjectDetails.jsx";
import StaffMemberDetails from "./pages/Admin/StaffMemberDetails.jsx";
import UserDetails from "./pages/Admin/UserDetails.jsx";
import Logout from "./pages/Admin/Logout.jsx";
import MarkAttendance from "./pages/Admin/MarkAttendance.jsx";
import TeacherDetails from "./pages/Admin/TeacherDetails.jsx";
import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import CreateAttendanceSheet from "./pages/Admin/CreateAttendanceSheet.jsx";
import AttendanceList from "./pages/Admin/AttendanceList.jsx";
import StaffDashboard from "./DashboardLayout/StaffDashboard.jsx";
import TeacherDashboard from "./DashboardLayout/TeacherDashboard.jsx";
import TeacherHome from "./pages/Teacher/TeacherHome.jsx";
import AddTest from "./pages/Teacher/AddTest.jsx";
import TeacherStudents from "./pages/Teacher/TeacherStudents.jsx";
import StudentDetails from "./pages/Admin/StudentDetails.jsx";
import AddStudentSubjects from "./pages/Admin/AddStudentSubjects.jsx";
import TeacherLogout from "./pages/Teacher/TeacherLogout.jsx";
import StudentDashboard from "./DashboardLayout/StudentDashboard.jsx";
import QuizzesList from "./pages/Student/QuizzesList.jsx";
import AttemptQuiz from "./pages/Student/AttemptQuiz.jsx";
import StudentProfile from "./pages/Student/StudentProfile.jsx";
import StudentLogout from "./pages/Student/StudentLogout.jsx";
import Marks from "./pages/Student/Marks.jsx";
import StudentMarksDetails from "./pages/Teacher/StudentMarksDetails.jsx";
import axios from "axios";
import {useEffect} from "react";
import StudentMarks from "./pages/Admin/StudentMarks.jsx";
import StaffHome from "./pages/Staff/StaffHome.jsx";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

async function refreshCookie() {
    try {
        const response = await axios.get(`${baseUrl}/api/refresh`)

        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

function App() {

    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <ToastContainer theme={"dark"}/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/admin-login"} element={<AdminLogin/>}/>
                    <Route path={"/staff-login"} element={<StaffLogin/>}/>
                    <Route path={"/teacher-login"} element={<TeacherLogin/>}/>
                    <Route path={"/student-login"} element={<StudentLogin/>}/>
                    {/*Admin Paths*/}
                    {user ? (
                        <></>
                    ) : (
                        <>
                            <Route path={"/"} element={<Login/>}/>
                        </>
                    )}
                    {user && user.role === 1 ? (
                        <>
                            <Route
                                path={"/"}
                                element={<Navigate to={"/admin-dashboard"}/>}
                            />
                            <Route path={"/admin-dashboard/"} element={<Home/>}/>
                            <Route
                                path={"/admin-dashboard/classes"}
                                element={<ClassesList/>}
                            />
                            <Route
                                path={"/admin-dashboard/subjects"}
                                element={<SubjectsList/>}
                            />
                            <Route
                                path={"/admin-dashboard/classes/add-class"}
                                element={<AddClass/>}
                            />
                            <Route
                                path={"/admin-dashboard/teachers"}
                                element={<TeachersList/>}
                            />
                            <Route
                                path={"/admin-dashboard/students"}
                                element={<StudentsList/>}
                            />
                            <Route path={"/admin-dashboard/staff"} element={<StaffList/>}/>
                            <Route
                                path={"/admin-dashboard/subjects/add-subjects"}
                                element={<AddSubjects/>}
                            />
                            <Route
                                path={"/admin-dashboard/class/:id"}
                                element={<ClassDetails/>}
                            />
                            <Route
                                path={"/admin-dashboard/students/add-student"}
                                element={<AddStudent/>}
                            />
                            <Route
                                path={"/admin-dashboard/staff/add-staff"}
                                element={<AddStaff/>}
                            />
                            <Route
                                path={"/admin-dashboard/teachers/add-teacher"}
                                element={<AddTeacher/>}
                            />
                            <Route
                                path={"/admin-dashboard/classes/:cid/subjects/:id"}
                                element={<SubjectDetails/>}
                            />
                            <Route
                                path={"/admin-dashboard/staff/:id"}
                                element={<StaffMemberDetails/>}
                            />
                            {/*<Route path={'/admin-dashboard/students/:id'} element={<StudentDetails/>}/>*/}
                            {/*<Route path={'/admin-dashboard/classes/:cid/students/add-subject-students/:id'}*/}
                            {/*       element={<AddSubjectStudents/>}/>*/}
                            <Route
                                path={"/admin-dashboard/user-details"}
                                element={<UserDetails/>}
                            />
                            <Route
                                path={"/admin-dashboard/logout"}
                                element={<Logout user={"user"}/>}
                            />
                            <Route
                                path={"/admin-dashboard/teachers/teacher-attendance/:id"}
                                element={<MarkAttendance/>}
                            />
                            <Route
                                path={"/admin-dashboard/teachers/:id"}
                                element={<TeacherDetails/>}
                            />

                            <Route
                                path={"/admin-dashboard/teachers/create-attendance-sheet/:id"}
                                element={<CreateAttendanceSheet/>}
                            />
                            <Route
                                path={"/admin-dashboard/teacher/attendance-details/:id"}
                                element={<AttendanceList/>}
                            />
                            <Route
                                path={"/admin-dashboard/students/:id"}
                                element={<StudentDetails/>}
                            />
                            <Route
                                path={"/admin-dashboard/student/add-subjects/:id"}
                                element={<AddStudentSubjects/>}
                            />
                            <Route path={'/admin-dashboard/student/student-marks/:id'} element={<StudentMarks/>}/>
                        </>
                    ) : (
                        <>
                            <Route
                                path={"/admin-dashboard/"}
                                element={<Navigate to={"/"}/>}
                            />

                            <Route
                                path={"/admin-dashboard/classes"}
                                element={<Navigate to={"/"}/>}
                            />
                            <Route
                                path={"/admin-dashboard/classes/add-class"}
                                element={<Navigate to={"/"}/>}
                            />
                        </>
                    )}
                    {/*Admin Paths*/}

                    {/*Staff Routes start here.......*/}
                    {user && user.role === 0 ? (
                        <>
                            <Route path={"/staff-dashboard"} element={<StaffHome/>}/>
                        </>
                    ) : (
                        <>
                            <Route
                                path={"/staff-dashboard"}
                                element={<Navigate to={"/"}/>}
                            />
                        </>
                    )}
                    {/*Staff Routes End Here..........*/}

                    {/*<Route path={"/student-dashboard"} element={<StaffDashboard />} />*/}
                    {/*Teacher Routes.........*/}
                    {user && user.role === 2 ? (
                        <>
                            <Route
                                path={"/"}
                                element={<Navigate to={"/teacher-dashboard"}/>}
                            />

                            <Route path={"/teacher-dashboard"} element={<TeacherHome/>}/>
                            <Route
                                path={"/teacher-dashboard/create-test"}
                                element={<AddTest/>}
                            />
                            <Route
                                path={"/teacher-dashboard/teacher-students"}
                                element={<TeacherStudents/>}
                            />
                            <Route path={'/teacher-dashboard/teacher-students/student-marks/:id'}
                                   element={<StudentMarksDetails/>}/>
                            <Route
                                path={"/teacher-dashboard/teacher/details"}
                                element={<TeacherProfile/>}
                            />
                            <Route
                                path={"/teacher-dashboard/logout"}
                                element={<TeacherLogout/>}
                            />
                        </>
                    ) : (
                        <></>
                    )}

                    {/*Student Routes...........................*/}
                    {user && user.role === 3 ?
                        <>
                            <Route
                                path={"/"}
                                element={<Navigate to={"/student-dashboard"}/>}
                            />
                            <Route path={"/student-dashboard"} element={<QuizzesList/>}/>
                            <Route path={"/student-dashboard/attempt-quiz/:id"} element={<AttemptQuiz/>}/>
                            <Route
                                path={"/student-dashboard/marks"}
                                element={<Marks/>}
                            />
                            <Route
                                path={"/student-dashboard/student/details"}
                                element={<StudentProfile/>}
                            />
                            <Route
                                path={"/student-dashboard/logout"}
                                element={<StudentLogout/>}
                            />
                        </>
                        :
                        <>
                        </>}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
