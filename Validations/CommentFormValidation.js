import * as yup from 'yup';

export const commentFormSchema = yup.object().shape({
  comment: yup
    .string()
    .max(1250, '⛔ Has excedido el límite máximo de caracteres'),
});
