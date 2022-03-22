import * as yup from 'yup';

export const linkFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Minimo 5 caracteres')
    .max(40, 'Maximo 40 caracteres')
    .required('Campo Requerido'),
  link: yup.string().url('Url no valida').required('Campo Requerido'),
  description: yup
    .string()
    .required('Campo Requerido')
    .min(5, 'Minimo 5 caracteres'),
  githubRepo: yup.string().url('Url no valida'),
  tecnologies: yup.string(),
});
