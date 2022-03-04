import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(255),
  content: Yup.string().required().min(3).max(100000),
  pictureId: Yup.number().required().positive(),
});

export default validationSchema;
