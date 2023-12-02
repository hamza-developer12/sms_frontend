import StudentDashboard from "../../DashboardLayout/StudentDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userDetailsApi} from "../../redux/api/UserDetailsSlice.js";

const StudentProfile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userDetailsApi("student/student-profile"));
    }, []);
    const {loading, data, error} = useSelector(
        (state) => state.userDetailsSlice
    );
    return (
        <StudentDashboard>
            <div className={"ml-10 mt-20 text-xl"}>
                <h1>Name: {data.fullName}</h1>
                <h1>Gender: {data.gender}</h1>
                <h1>Email: {data.email}</h1>
                <h1>Roll Number: {data.studentRollNumber}</h1>
            </div>
        </StudentDashboard>
    );
}
export default StudentProfile;