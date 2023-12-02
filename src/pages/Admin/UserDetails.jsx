import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userDetailsApi} from "../../redux/api/UserDetailsSlice.js";

const UserDetails = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userDetailsApi('users/user-details'))
    }, [])
    const {loading, data, error} = useSelector((state) => state.userDetailsSlice);
    return (
        <AdminDashboard>
            <div className={'ml-10 mt-20 text-xl'}>
                <h1>Name: {data.name}</h1>
                <h1>Father Name: {data.fatherName}</h1>
                <h1>Email: {data.email}</h1>
                <h1>Phone Number: {data.phoneNumber}</h1>
            </div>
        </AdminDashboard>
    );
}

export default UserDetails;