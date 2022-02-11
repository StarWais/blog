import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(255),
  email: Yup.string().email().min(5).max(255).required(),
  description: Yup.string().min(5).max(255).required(),
  confirmEmail: Yup.string()
    .email()
    .min(5)
    .max(255)
    .required()
    .oneOf([Yup.ref('email')], 'emails must match'),
});

export default validationSchema;
