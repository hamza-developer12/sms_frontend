import AdminDashboard from "../DashboardLayout/AdminDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllClassesApi} from "../redux/api/GetAllClasses.js";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {addStudentApi} from "../redux/api/AddStudentSlice.js";

const AddStudent = () => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllClassesApi());
    }, []);
    const {loading, data, error} = useSelector((state) => state.getAllClassesSlice)

    const handleSubmit = (e) => {
        e.preventDefault();
        let fullName = e.target.fullName.value;
        let gender = e.target.gender.value;
        let studentRollNumber = e.target.studentRollNumber.value;
        let classId = e.target.classId.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        if (gender === '') {
            return toast.error('Please Select a Gender')
        }
        if (classId === '') {
            return toast.error('Please Select a Class')
        }
        let apiData = {fullName, gender, studentRollNumber, classId, email, password}
        dispatch(addStudentApi(apiData))
        e.target.reset();
    }

    return (
        <AdminDashboard>
            <div className={'flex flex-col items-center justify-center mt-2'}>
                <h1 className={'text-3xl font-semibold text-center my-2'}>Add Student</h1>
                <form className={'flex flex-col items-center justify-center w-full'} onSubmit={handleSubmit}>
                    <input type={'text'} name={'fullName'} placeholder={'Enter Student Full Name'}
                           className={'p-3 rounded my-2 w-[40%]'}/>
                    <input type={'text'} name={'studentRollNumber'} placeholder={'Enter Student Roll Name'}
                           className={'p-3 rounded my-2 w-[40%]'}/>

                    <select className={'p-3 rounded w-[40%] my-2 bg-white '} name={'classId'}>
                        <option className={''} value={''}>Select Student Class</option>
                        {Array.isArray(data) && data.map((item) => (
                            <option className={'text-black'} key={item._id}
                                    value={item._id}>{item.className}</option>
                        ))}
                    </select>
                    <select className={'p-3 rounded w-[40%] my-2 bg-white '} aria-label={'Select'} name={'gender'}>
                        <option value={''}>Select Gender</option>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                    </select>
                    <input type={'email'} name={'email'} placeholder={'Enter Student Email'}
                           className={'p-3 rounded my-2 w-[40%]'}/>
                    <input type={'password'} name={'password'} placeholder={'Enter Password'}
                           className={'p-3 rounded my-2 w-[40%]'}/>
                    <button type={'submit'}
                            className={'w-[40%] rounded my-2 p-3 bg-blue-500 text-white'}>Submit
                    </button>
                    <button type={'reset'}
                            className={'w-[40%] rounded my-2 p-3 bg-white' +
                                ' border-[1px] border-blue-500 text-black'}>Cancel
                    </button>
                </form>

            </div>
        </AdminDashboard>
    );
}
export default AddStudent;