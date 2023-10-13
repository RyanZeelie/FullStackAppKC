import {
  GradesIcon,
  ClassesIcon,
  StudentsIcon,
  DashBoardIcon
} from "../components/common/icons/Icons";

const Menu = [
  {
    label: "Dashboard",
    icon: DashBoardIcon,
    route: "/",
  },
  {
    label: "Grades",
    icon: GradesIcon,
    route: "/grades",
  },
  { label: "Classes", 
    icon: ClassesIcon, 
    route: "/classes" 
  },
  { label: "Students", 
    icon: StudentsIcon, 
    route: "/students" 
  },
];

export default Menu;
