import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSingleStaffApi} from "../../redux/api/GetSingleStaffSlice.js";

const StaffMemberDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleStaffApi(id))
    }, []);
    const {loading, data, error} = useSelector((state) => state.getSingleStaffSlice)
    return (
        <AdminDashboard>
            <div className={' mt-10 '}>
                <h1 className={'text-3xl font-semibold text-center'}>Staff Member Details</h1>
                <div className={'mt-10 ml-10'}>
                    <h1 className={'text-lg font-semibold'}>Name: {data.name}</h1>
                    <h1 className={'text-lg font-semibold'}>Father Name: {data.fatherName}</h1>
                    <h1 className={'text-lg font-semibold'}>Email: {data.email}</h1>
                    <h1 className={'text-lg font-semibold'}>Cnic Number: {data.cnic}</h1>
                    <h1 className={'text-lg font-semibold'}>Phone Number: {data.phoneNumber}</h1>
                    <h1 className={'text-lg font-semibold'}>Blood Group: {data.bloodGroup}</h1>
                    <h1 className={'text-lg font-semibold'}>Present Address: {data.presentAddress}</h1>
                    <h1 className={'text-lg font-semibold'}>Permanent Address: {data.permanentAddress}</h1>

                </div>
            </div>
        </AdminDashboard>
    );
}
export default StaffMemberDetails;