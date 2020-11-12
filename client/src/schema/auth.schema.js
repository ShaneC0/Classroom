const yup = require('yup')

const authSchema = yup.object().shape({
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
})

export default authSchema