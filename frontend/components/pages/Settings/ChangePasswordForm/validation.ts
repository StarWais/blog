import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().min(8).max(255).required(),
  newPassword: Yup.string().min(8).max(255).required(),
});

export default validationSchema;
