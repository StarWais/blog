import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(255),
  email: Yup.string().email().min(5).max(255).required(),
  description: Yup.string().max(255),
});

export default validationSchema;
