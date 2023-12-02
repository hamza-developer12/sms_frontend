import {useDispatch} from "react-redux";
import {loginApi} from "../redux/api/loginSlice.js";

const TeacherLogin = () => {
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let user = "teacher";
        const apiData = {email, password, user}
        dispatch(loginApi(apiData))
    }
    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <form onSubmit={handleSubmit}
                  className="w-[390px] mx-auto   rounded-lg shadow-2xl py-8 bg-white">
                <div className="w-[80%] mx-auto">
                    <h1 className={'text-center font-bold text-3xl mt-4 mb-2'}>Teacher Login</h1>
                    <input
                        className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
                        placeholder="Enter Email"
                        type="email"
                        name="email"
                        required
                    />

                    <input
                        className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                        required
                    />
                    {/*{loginData.error && (*/}
                    {/*    <div className="text-red-500">{loginData.error}</div>*/}
                    {/*)}*/}
                    {/*{loginData.data.success && (*/}
                    {/*    <div className="text-green-500">{loginData.data.msg}</div>*/}
                    {/*)}*/}
                    <button className="my-4 bg-blue-500 shadow-lg w-full text-white p-2 rounded-sm">
                        Login
                    </button>
                    <div className="w-auto flex items-center justify-end">
                        <p
                            className="text-right   text-blue-500 hover:cursor-pointer">
                            Forgot Password?
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TeacherLogin;