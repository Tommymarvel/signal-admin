import * as Yup from 'yup'
const validRoles = ['1', '2', '3', '4']

export type adminInfo ={
    f_name : string;
    l_name :  string;
    email : string;
    role : string;
}

export type adminDetails = {
    id ?: number
    name :  string
    email : string
    role : string
    dateCreated : string
    status : string

}

export type adminOption = {
    label: string;
    value: string;
};

export const adminOptions: adminOption[] = [
    {label : 'Super Admin', value : '1'},
    {label : 'Finance Admin', value : '2'},
    {label : 'Support Admin', value : '3'}
]

export const addAdminSchema = Yup.object().shape({
    name : Yup.string().required('Last name is required').trim(),
    email : Yup.string().email('Must be a valid email address').lowercase().required('Email Field is required').trim(),
    role : Yup.string().oneOf(validRoles).required('Role is required')
})