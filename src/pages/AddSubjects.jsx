import AdminDashboard from "../DashboardLayout/AdminDashboard.jsx";
import classroom from "../assets/classroom.png";
import {useDispatch, useSelector} from "react-redux";
import {addSubjectApi} from "../redux/api/AddSubjectSlice.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getAllClassesApi} from "../redux/api/GetAllClasses.js";
import {getAllTeachersApi} from "../redux/api/GetAllTeachers.js";

const AddSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllClassesApi())
        dispatch(getAllTeachersApi())
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const subjectName = e.target.subjectName.value;
        const classId = e.target.classId.value;
        const subjectTeacher = e.target.subjectTeacher.value;
        if (classId === '') {
            return toast.error("Please select a class")
        }
        if (subjectTeacher === '') {
            return toast.error("Please select a Teacher")
        }
        const apiData = {
            subjectName, classId, subjectTeacher
        }
        dispatch(addSubjectApi(apiData)).then(() => {
            navigate('/admin-dashboard/subjects')
        });
    }
    const {loading, data, error} = useSelector((state) => state.addSubjectSlice)
    const classData = useSelector((state) => state.getAllClassesSlice);
    const teachers = useSelector((state) => state.getAllTeachersSlice,)

    return <AdminDashboard>
        <div>

            <div
                className={'mx-auto w-[50%] mt-8 mb-8 bg-white flex items-center justify-center p-2 rounded border-2 shadow-lg'}>
                <div className={'flex flex-col items-center justify-center'}>
                    <div>
                        <img src={classroom} alt={'classroom img'}/>
                    </div>
                    <form className={'flex flex-col w-full items-center justify-center mt-2'}
                          onSubmit={handleSubmit}>
                        <input type={'text'} placeholder={'Add Subject*'} name={'subjectName'}
                               required={true}
                               className={'w-[100%] p-3 border-2 rounded my-2'}/>
                        <select className={'w-[100%] p-3 border-2 rounded my-2'} name={'classId'}>
                            <option value={''}>Select Class</option>
                            {Array.isArray(classData.data) && classData.data.map((item) => (
                                <option value={item._id} key={item._id}
                                        className={'w-[100%] p-3 border-2 rounded my-2'}>{item.className}</option>
                            ))}
                        </select>
                        <select className={'w-[100%] p-3 border-2 rounded my-2'} name={'subjectTeacher'}>
                            <option value={''}>Select Teacher</option>
                            {Array.isArray(teachers.data) && teachers.data.map((item) => (
                                <option value={item._id} key={item._id}
                                        className={'w-[100%] p-3 border-2 rounded my-2'}>{item.name}</option>
                            ))}
                        </select>
                        <button type={"submit"}
                                className={'w-full bg-blue-800 text-white p-2 my-4 rounded'}>Add Subject
                        </button>
                        <button type={"button"}
                                className={'w-full border-2 border-blue-500 p-2 rounded mt-2 mb-5'}
                                onClick={() => {
                                    navigate('/admin-dashboard/subjects/')
                                }}>GO
                            BACK
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </AdminDashboard>
}

export default AddSubjects;