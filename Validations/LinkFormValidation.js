import * as yup from 'yup';

export const linkFormSchema = yup.object().shape({
  title: yup
    .string()
    .strict(true)
    .min(5, 'Minimo 5 caracteres')
    .required('Campo Requerido'),
  link: yup.string().url('Url no valida').required('Campo Requerido'),
  description: yup
    .string()
    .strict(true)
    .required('Campo Requerido')
    .min(5, 'Minimo 5 caracteres'),
  githubRepo: yup.string().url('Url no valida'),
  tecnologies: yup.string().strict(true),
});
