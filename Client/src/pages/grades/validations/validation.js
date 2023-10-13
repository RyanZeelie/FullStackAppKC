import * as Yup from 'yup'

const validation = Yup.object().shape({
    Name:Yup.string().required()
})

export default validation