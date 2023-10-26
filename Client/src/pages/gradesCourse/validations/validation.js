import * as Yup from 'yup'

const validation = Yup.object().shape({
    courseId:Yup.number().moreThan(0, "Course is required"),
    gradeId:Yup.number().moreThan(0, "Grade is required")
})

export default validation