import * as Yup from "yup";

const validation = Yup.object().shape({
  classId: Yup.number().moreThan(0, "Class is required"),
  englishName: Yup.string().required("English name is required"),
  surname: Yup.string().required("Surname name is required"),
});

export default validation;
