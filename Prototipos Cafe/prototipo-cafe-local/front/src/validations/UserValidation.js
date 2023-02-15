import * as yup from 'yup'

export const userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    coffee: yup.number().min(1).required(),
    info: yup.boolean()
});