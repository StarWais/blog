import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().min(5).max(255),
  password: Yup.string().required().min(8).max(255),
  name: Yup.string().required().min(2).max(255),
  passwordConfirm: Yup.string()
    .required('password confirmation is required')
    .oneOf([Yup.ref('password')], 'passwords must match'),
});
export default validationSchema;
