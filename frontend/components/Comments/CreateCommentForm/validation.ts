import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('required field')
    .min(2, 'comment must be at least 2 characters long')
    .max(255, 'comment must be less than 255 characters long'),
});

export default validationSchema;
