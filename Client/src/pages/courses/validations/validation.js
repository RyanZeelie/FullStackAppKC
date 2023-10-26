import * as Yup from 'yup'

const validation = Yup.object().shape({
    name:Yup.string().required()
})

export default validation