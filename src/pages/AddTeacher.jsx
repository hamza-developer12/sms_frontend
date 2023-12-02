import AdminDashboard from "../DashboardLayout/AdminDashboard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addTeacherApi} from "../redux/api/AddTeacherSlice.js";
import {useEffect} from "react";
import {getAllSubjectsApi} from "../redux/api/GetAllSubjects.js";
import {toast} from "react-toastify";


const AddTeacher = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSubjectsApi())
    }, [])
    const {loading, data, error} = useSelector((state) => state.getAllSubjectsSlice)
    const handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let fatherName = e.target.fatherName.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let phoneNumber = e.target.phoneNumber.value;
        let cnic = e.target.cnic.value;
        let bloodGroup = e.target.bloodGroup.value || 'n/a';
        let presentAddress = e.target.presentAddress.value;
        let permanentAddress = e.target.permanentAddress.value;

        const apiData = {
            name, fatherName, email, password, phoneNumber, cnic, bloodGroup, presentAddress,
            permanentAddress
        };
        dispatch(addTeacherApi(apiData))
        e.target.reset();
    }
    return (
        <AdminDashboard>
            <div
                className={'flex items-center justify-center rounded-md shadow-lg flex-col w-full lg:w-[50%] mx-auto mt-4 mb-4 py-4 bg-white'}>
                <h1 className={'text-3xl font-bold  my-4'}>Add Teacher</h1>
                <form className={'flex items-center justify-center flex-col gap-4'} onSubmit={handleSubmit}>
                    <div>
                        <input type={'text'} name={'name'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Name'}/>
                        <input type={'text'} name={'fatherName'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Father Name'}/>
                    </div>
                    <div>
                        <input type={'email'} name={'email'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Email'}/>
                        <input type={'password'} name={'password'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Password'}/>
                    </div>
                    <div>
                        <input type={'text'} name={'phoneNumber'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Phone Number'}/>
                        <input type={'text'} name={'cnic'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Cnic Number'}/>
                    </div>
                    <div>
                        <input type={'text'} name={'bloodGroup'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-full'}
                               placeholder={'Enter Blood Group'}/>
                        
                    </div>
                    <div>
                        <input type={'text'} name={'presentAddress'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Present Address'}/>
                        <input type={'text'} name={'permanentAddress'}
                               className={'p-3 rounded mx-2 my-2 border-[2px] w-full md:w-auto'}
                               placeholder={'Enter Permanent Address'}/>
                    </div>
                    <div className={'flex flex-col items-center justify-between w-full gap-2'}>
                        <button type={"submit"}
                                className={'px-4 w-full py-3 rounded text-white my-1 bg-blue-500'}>Submit
                        </button>
                        <button type={"reset"}
                                className={'px-4 w-full py-3 rounded  my-1 border-2 border-blue-500'}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboard>
    );
}
export default AddTeacher;