import * as Yup from "yup";

const validation = Yup.object().shape({
  name: Yup.string().required("A class name is required"),
  gradeCourseId: Yup.number().moreThan(0, "Grade and Course Required"),
  levelId: Yup.number().moreThan(0, "Level is Required"),
});

export default validation;
