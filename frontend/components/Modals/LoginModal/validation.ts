import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().min(5).max(255),
  password: Yup.string().required().min(8).max(255),
});

export default validationSchema;
