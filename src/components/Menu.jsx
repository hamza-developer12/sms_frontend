import { BiChevronLeft , BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg'
import { GoTriangleUp } from 'react-icons/go';

const Menu = ({ children , items , user }) => {
    const navigate = useNavigate();
    const [popup , setPopup] = useState(false)
    const [expanded , setExpanded] = useState(false)
    return (
        <div className={ 'flex ' }>
            <div
                className={ `flex flex-col  ${ expanded ? 'w-[200px]' : 'w-20 ' } bg-gray-100 border-r-2 h-screen duration-300` }>
                <div className={ 'flex gap-x-2  w-[200px] h-[8vh] pl-2  border-b-2 items-center' }>
                    <h1 className={ `${ expanded ? 'block' : 'hidden' } font-semibold ` }>{ user } Dashboard</h1>
                    { expanded ?
                        <BiChevronLeft className={ 'flex ' +
                            'p-1 hover:bg-gray-300 text-3xl hover:duration-300 hover:rounded-full' } onClick={ () => {
                            setExpanded(false)
                        } }/> : <BiChevronRight className={ 'flex ' +
                            'p-1 hover:bg-gray-300 text-3xl hover:duration-300 hover:rounded-full' }
                                                onClick={ () => {
                                                    setExpanded(true)
                                                } }/> }
                </div>
                <div className={ 'border-b-2 fixed top-[80px] h-screen ' }>
                    <div className={ `flex  items-center gap-x-2  ${ expanded ? 'w-[200px]' : 'w-20' } mt-1` }>
                        <div className={ ' w-full' }>
                            { items.map((data , index) => (
                                <NavLink to={ data.item_link } key={ index }>
                                    <div
                                        className={ 'flex items-center hover:bg-gray-200 w-auto p-3 gap-x-2' +
                                            ' hover:cursor-pointer ' }>
                                        <data.icon size={ 25 }/>
                                        <h1 className={ `${ expanded ? 'block' : 'hidden' } text-lg` }>{ data.itemName }</h1>
                                    </div>

                                </NavLink>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
            <div className={ 'w-full  ' }>
                <div className={ 'flex items-center justify-between px-8 bg-blue-500 h-[8vh] w-[100%]' }>
                    <h1 className={ 'text-white text-lg font-semibold' }>{ user } Dashboard</h1>
                    <CgProfile className={ 'text-white text-3xl' } onClick={ () => {
                        setPopup(!popup)
                    } }/>

                </div>
                {/*Pages Go here.....*/ }
                { children }
                <div className={ `${ popup ? 'flex' : 'hidden' } absolute top-16 right-10 bg-white w-[30%] md:w-[10%] 
                    shadow-lg` }>
                    <GoTriangleUp className={ 'absolute -top-4 text-white -right-0 W' } size={ 25 }/>
                    <div className={ 'flex items-center flex-col justify-center w-full rounded-lg p-2' }>
                        <h1 className={ 'text-lg font-semibold  p-2 ' +
                            'hover:bg-gray-300 w-full hover:cursor-pointer' } onClick={ () => {
                            if (user === "Admin") {
                                navigate('/admin-dashboard/user-details')
                            } else if (user === "Staff") {
                                navigate('/staff-dashboard/staff/details')
                            } else if (user === "Teacher") {
                                navigate('/teacher-dashboard/teacher/details')
                            } else if (user === "Student") {
                                navigate('/student-dashboard/student/details')
                            }
                            setPopup(false)
                        } }>Profile</h1>

                        <h1 className={ 'text-lg font-semibold ' +
                            ' p-2 w-full hover:cursor-pointer hover:bg-gray-300' } onClick={ () => {
                            if (user === "Admin") {
                                navigate('/admin-dashboard/logout')
                            } else if (user === "Staff") {
                                navigate('/staff-dashboard/logout')
                            } else if (user === "Teacher") {
                                navigate('/teacher-dashboard/logout')
                            } else if (user === "Student") {
                                navigate('/student-dashboard/logout')
                            }
                            setPopup(false)
                        } }>Logout</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Menu;

