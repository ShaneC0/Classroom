import * as yup from "yup";

const lessonSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name must be less than 50 characters")
    .required("Class name is required"),
  period: yup
    .string()
    .required()
})

export default lessonSchema;
