import Menu from '../components/Menu.jsx';
import {BiHome, BiLogIn} from 'react-icons/bi';
import {SiGoogleclassroom} from 'react-icons/si';
import {AiOutlineBook} from 'react-icons/ai';
import {MdPeopleOutline} from 'react-icons/md';
import {LuClipboardList} from 'react-icons/lu';
import {FaPeopleGroup} from 'react-icons/fa6';
import {BsPersonCircle} from "react-icons/bs";

const listItems = [
    {
        itemName: 'Home',
        icon: BiHome,
        item_link: '/admin-dashboard'
    },
    {
        itemName: 'Classes',
        icon: AiOutlineBook,
        item_link: '/admin-dashboard/classes/'
    },
    {
        itemName: 'Subjects',
        icon: LuClipboardList,
        item_link: '/admin-dashboard/subjects'
    },
    {
        itemName: 'Teachers',
        icon: MdPeopleOutline,
        item_link: '/admin-dashboard/teachers'
    },
    {
        itemName: 'Students',
        icon: SiGoogleclassroom,
        item_link: '/admin-dashboard/students'
    },
    {
        itemName: 'Profile',
        icon: BsPersonCircle,
        item_link: '/admin-dashboard/user-details'
    },
    {
        itemName: 'Logout',
        icon: BiLogIn,
        item_link: '/admin-dashboard/logout'
    }

];
const StaffDashboard = ({children}) => {
    return (
        <div>
            <div>
                <Menu items={listItems} user={'Staff'}>
                    {children}
                </Menu>
            </div>
        </div>
    );
}
export default StaffDashboard;