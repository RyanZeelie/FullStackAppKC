import {
  GradesIcon,
  ClassesIcon,
  StudentsIcon,
} from "../components/common/icons/Icons";

const Menu = [
  {
    label: "Grades",
    icon: GradesIcon,
    route: "/classes",
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
