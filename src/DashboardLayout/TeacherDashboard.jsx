import Menu from "../components/Menu.jsx";
import { BiHome, BiLogIn } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { AiFillFileAdd, AiOutlineBook } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";

const listItems = [
  {
    itemName: "Home",
    icon: BiHome,
    item_link: "/teacher-dashboard",
  },
  {
    itemName: "Create Test",
    icon: AiFillFileAdd,
    item_link: "/teacher-dashboard/create-test",
  },
  {
    itemName: "Students",
    icon: PiStudentFill,
    item_link: "/teacher-dashboard/teacher-students",
  },
  {
    itemName: "Profile",
    icon: BsPersonCircle,
    item_link: "/teacher-dashboard/teacher/details",
  },
  {
    itemName: "Logout",
    icon: BiLogIn,
    item_link: "/teacher-dashboard/logout",
  },
];
const user = "Teacher";
const TeacherDashboard = ({ children }) => {
  return (
    <div>
      <div>
        <Menu items={listItems} user={user}>
          {children}
        </Menu>
      </div>
    </div>
  );
};
export default TeacherDashboard;
