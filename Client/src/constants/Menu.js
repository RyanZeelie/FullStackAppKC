import {
  GradesIcon,
  ClassesIcon,
  StudentsIcon,
  DashBoardIcon,
} from "../components/common/icons/Icons";

const AdminMenu = [
  {
    label: "Grades",
    icon: DashBoardIcon,
    route: "/grades",
  },
  {
    label: "Courses",
    icon: GradesIcon,
    route: "/courses",
  },
  { label: "Levels", icon: ClassesIcon, route: "/levels" },
  { label: "Course Setup", icon: StudentsIcon, route: "/gradeCourse" },
  { label: "Users", icon: StudentsIcon, route: "/users" },
];

const Menu = [
  {
    label: "Dashboard",
    icon: DashBoardIcon,
    route: "/",
  },
  { label: "Classes", icon: ClassesIcon, route: "/classes" },
  { label: "Students", icon: StudentsIcon, route: "/students" },
];

export { Menu, AdminMenu };
