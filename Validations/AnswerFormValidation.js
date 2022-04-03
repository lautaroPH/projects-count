import * as yup from 'yup';

export const AnswerFormValidation = yup.object().shape({
  answer: yup
    .string()
    .max(1250, '⛔ Has excedido el límite máximo de caracteres'),
});
