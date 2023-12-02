import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutApi} from "../../redux/api/LogoutUserSlice.js";

const Logout = ({user}) => {
    // console.log(user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logoutApi(user))
    }
    return (
        <AdminDashboard>
            <div className={'h-screen w-full flex items-center justify-center'}>
                <div className={'md:w-[50%] w-full h-[50%] text-center md:h-[50%] bg-white border-2 ' +
                    'border-gray-200 rounded shadow-lg flex flex-col items-center justify-center'}>
                    <h1 className={'text-md md:text-2xl font-bold'}>Are You Sure You Want To Logout?</h1>
                    <div className={'flex items-center justify-between gap-4 md:gap-8 mt-4'}>
                        <button className={'bg-red-500 text-white md:px-10 md:py-4 px-4 py-2 rounded'}
                                onClick={handleClick}>Yes
                        </button>
                        <button className={'bg-blue-500 text-white md:px-10 md:py-4 px-4 py-2 rounded'} onClick={
                            () => {
                                navigate('/admin-dashboard')
                            }
                        }>No
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboard>
    );
}

export default Logout;