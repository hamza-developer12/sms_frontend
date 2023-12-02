import AdminDashboard from "../../DashboardLayout/AdminDashboard.jsx";
// This is the one
import StudentSubMenu from "./StudentSubMenu.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSpecificSubjectsApi} from "../../redux/api/GetSpecificSubjectsSlice.js";
import {addSubjectStudentsApi} from "../../redux/api/AddSubjectStudentsSlice.js";

const AddStudentSubjects = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    useEffect(() => {
        dispatch(getSpecificSubjectsApi(id))
    }, [])
    const {loading, data, error} = useSelector((state) => state.getSpecificSubjectsSlice)

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            // If checkbox is checked, add its value to the selectedCheckboxes array
            setSelectedCheckboxes((prevSelected) => [...prevSelected, checkboxValue]);
        } else {
            // If checkbox is unchecked, remove its value from the selectedCheckboxes array
            setSelectedCheckboxes((prevSelected) =>
                prevSelected.filter((value) => value !== checkboxValue)
            );
        }
    };
    const handleSubmit = () => {
        const apiData = {id: id, selectedCheckboxes: selectedCheckboxes}
        // console.log(apiData)
        dispatch(addSubjectStudentsApi(apiData))
    }
    return (
        <AdminDashboard>
            <StudentSubMenu>
                <div className="mt-10">
                    <h1 className={'text-3xl font-semibold text-center my-4'}>Add Subjects To The Selected Students</h1>
                    <div className="md:w-[700px] w-full mx-auto h-48 overflow-scroll border-2 border-black">
                        <table className="w-full overflow-scroll">
                            <thead>
                            <tr>
                                <th className="text-center bg-red-400 w-auto">Checkbox</th>
                                <th className="text-center bg-yellow-400 w-auto">Content</th>
                            </tr>
                            </thead>
                            <tbody className={'overflow-y-scroll'}>
                            {Array.isArray(data) &&
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="ml-5">
                                            <input
                                                className="w-full"
                                                type="checkbox"
                                                value={item._id}
                                                onChange={handleCheckboxChange}
                                                checked={selectedCheckboxes.includes(item._id)}
                                            />
                                        </td>
                                        <td>
                                            <h1 className="w-full text-center">{item.subjectName}</h1>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={'flex items-center justify-center'}>
                        <button className={'bg-blue-500 p-4 rounded my-4 text-white '}
                                onClick={handleSubmit}>Add Subjects
                        </button>
                    </div>
                </div>
            </StudentSubMenu>
        </AdminDashboard>
    );
}
export default AddStudentSubjects;