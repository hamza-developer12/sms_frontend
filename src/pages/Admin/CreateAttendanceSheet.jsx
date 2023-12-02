import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import classroom from "../../assets/classroom.png";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createAttendanceApi} from "../../redux/api/CreateAttendanceSlice.js";
import AttendanceSubMenu from "./AttendanceSubMenu.jsx";

const CreateAttendanceSheet = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const month = e.target.month.value;
        const apiData = {
            teacher: id,
            month: month,
        }
        dispatch(createAttendanceApi(apiData)).then(() => {
            navigate('/admin-dashboard/teachers')
        })
        e.target.reset();
    }
    return (
        <AdminDashboard>
            <AttendanceSubMenu id={id}>
                <div
                    className={'mx-auto w-[50%] mt-4 mb-4 bg-white flex items-center justify-center p-2 rounded border-2 shadow-lg'}>
                    <div className={'flex flex-col items-center justify-center'}>
                        <div>
                            <img src={classroom} alt={'classroom img'}/>
                        </div>
                        <form className={'flex flex-col w-full items-center justify-center mt-2'}
                              onSubmit={handleSubmit}>
                            <input type={'text'} placeholder={'Create Attendance For Month'} name={'month'}
                                   className={'w-[100%] p-4 border-2 rounded my-2'}/>

                            <button type={"submit"}
                                    className={'w-full bg-blue-800 text-white p-2 my-4 rounded'}>CREATE
                            </button>
                            <button type={"button"}
                                    className={'w-full border-2 border-blue-500 p-2 rounded mt-2 mb-5'}
                                    onClick={() => {
                                        navigate(`/admin-dashboard/teachers/${id}`)
                                    }}>GO
                                BACK
                            </button>
                        </form>
                    </div>
                </div>
            </AttendanceSubMenu>
        </AdminDashboard>
    );
}

export default CreateAttendanceSheet;