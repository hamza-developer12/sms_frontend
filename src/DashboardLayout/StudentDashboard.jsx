import Menu from "../components/Menu.jsx";
import {BiHome, BiLogIn} from "react-icons/bi";
import {BsPersonCircle} from "react-icons/bs";
import {MdOutlineQuiz} from "react-icons/md";
import {TbFileSpreadsheet} from "react-icons/tb";

const listItems = [


    {
        itemName: "Quizzes",
        icon: MdOutlineQuiz,
        item_link: '/student-dashboard/'
    },
    {
        itemName: "Marks",
        icon: TbFileSpreadsheet,
        item_link: '/student-dashboard/marks'
    },
    {
        itemName: "Profile",
        icon: BsPersonCircle,
        item_link: "/student-dashboard/student/details",
    },
    {
        itemName: "Logout",
        icon: BiLogIn,
        item_link: "/student-dashboard/logout",
    },
];
const user = "Student";
const StudentDashboard = ({children}) => {
    return (
        <div>
            <div>
                <Menu items={listItems} user={'Student'}>
                    {children}
                </Menu>
            </div>
        </div>
    );
}
export default StudentDashboard