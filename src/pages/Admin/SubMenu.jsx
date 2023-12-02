import {useNavigate} from "react-router-dom";

const SubMenu = ({children}) => {
    const navigate = useNavigate()
    return (
        <div>
            <ul className={'flex items-center gap-x-2 '}>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/classes/')
                }}>Details
                </li>
                <li className={'p-2 hover:cursor-pointer'} onClick={() => {
                    navigate('/admin-dashboard/classes/add-class')
                }}>Add New Class
                </li>
            </ul>
            {children}
        </div>
    );
}

export default SubMenu;