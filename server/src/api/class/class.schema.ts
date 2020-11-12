import * as yup from "yup";

const classSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name must be less than 50 characters")
    .required("Class name is required"),
  period: yup
    .number()
    .positive("Period must be positive")
    .integer("Period must be an integer")
    .required("Period is required"),
});

export default classSchema;
