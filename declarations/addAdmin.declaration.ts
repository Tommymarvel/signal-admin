import * as Yup from 'yup'
const validRoles = ['super_admin', 'admin']
export const addAdminSchema = Yup.object().shape({
    f_name : Yup.string().required().trim(),
    l_name : Yup.string().required().trim(),
    email : Yup.string().email('Must be a valid email address').required('Email Field is required').trim(),
    role : Yup.string().oneOf(validRoles).required('Role is required')
})