import TeacherDashboard from "../../DashboardLayout/TeacherDashboard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userDetailsApi } from "../../redux/api/UserDetailsSlice.js";

const TeacherProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetailsApi("teacher/teacher-profile"));
  }, []);
  const { loading, data, error } = useSelector(
    (state) => state.userDetailsSlice
  );
  return (
    <TeacherDashboard>
      <div className={"ml-10 mt-20 text-xl"}>
        <h1>Name: {data.name}</h1>
        <h1>Father Name: {data.fatherName}</h1>
        <h1>Email: {data.email}</h1>
        <h1>Phone Number: {data.phoneNumber}</h1>
        <h1>Cnic: {data.cnic}</h1>
      </div>
    </TeacherDashboard>
  );
};
export default TeacherProfile;
