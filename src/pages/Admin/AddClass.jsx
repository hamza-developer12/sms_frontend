import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
import SubMenu from "./SubMenu.jsx";
import classroom from '../../assets/classroom.png'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addClassApi} from "../../redux/api/AddClassSlice.js";

const AddClass = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const className = e.target.className.value;
        const apiData = {
            className: className,
        }
        dispatch(addClassApi(apiData)).then(() => {
            navigate('/admin-dashboard/classes')
        }).catch((error) => {
        })
    }
    const {loading, data, error} = useSelector((state) => state.addClassSlice)

    return (
        <AdminDashboard>
            <div>
                <SubMenu>
                    <div
                        className={'mx-auto w-[50%] mt-8 mb-8 bg-white flex items-center justify-center p-2 rounded border-2 shadow-lg'}>
                        <div className={'flex flex-col items-center justify-center'}>
                            <div>
                                <img src={classroom} alt={'classroom img'}/>
                            </div>
                            <form className={'flex flex-col w-full items-center justify-center mt-2'}
                                  onSubmit={handleSubmit}>
                                <input type={'text'} placeholder={'Create a Class*'} name={'className'}
                                       className={'w-[100%] p-4 border-2 rounded my-2'}/>

                                <button type={"submit"}
                                        className={'w-full bg-blue-800 text-white p-2 my-4 rounded'}>CREATE
                                </button>
                                <button type={"button"}
                                        className={'w-full border-2 border-blue-500 p-2 rounded mt-2 mb-5'}
                                        onClick={() => {
                                            navigate('/admin-dashboard/classes/')
                                        }}>GO
                                    BACK
                                </button>
                            </form>
                        </div>
                    </div>
                </SubMenu>
            </div>
        </AdminDashboard>
    );
}
export default AddClass;