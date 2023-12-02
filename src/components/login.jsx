import admin_icon from '../assets/admin-icon.png';
import teacher_icon from '../assets/teacher-icon.png';
import student_icon from '../assets/student-icon.png';
import staff_icon from '../assets/staff-icon.png';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div
            className={'w-full h-screen flex items-center justify-center flex-col md:flex-row md:gap-4 gap-4'}>
            <div className={'border-2 bg-white duration-200 rounded-lg' +
                'mx-2 p-4 hover:shadow-lg hover:cursor-pointer'} onClick={() => {
                navigate('/admin-login')
            }}>
                <img src={admin_icon}/>
                <h1 className={'font-bold text-sm text-center'}>Admin Login</h1>
            </div>
            <div className={'border-2 bg-white duration-200 rounded-lg' +
                'mx-2 p-4 hover:shadow-lg hover:cursor-pointer'} onClick={() => {
                navigate('/staff-login')
            }}>
                <img src={staff_icon}/>
                <h1 className={'font-bold text-sm text-center'}>Staff Login</h1>
            </div>
            <div className={'border-2 bg-white duration-200 rounded-lg' +
                'mx-2 p-4 hover:shadow-lg hover:cursor-pointer'} onClick={() => {
                navigate('/teacher-login')
            }}>
                <img src={teacher_icon}/>
                <h1 className={'font-bold text-sm text-center'}>Teacher Login</h1>
            </div>
            <div className={'border-2 bg-white duration-200 rounded-lg' +
                'mx-2 p-4 hover:shadow-lg hover:cursor-pointer'} onClick={() => {
                navigate('/student-login')
            }}>
                <img src={student_icon}/>
                <h1 className={'font-bold text-sm text-center'}>Student Login</h1>
            </div>
        </div>
    );
}

export default Login;