import * as yup from 'yup';

export const ProfessionFormValidation = yup.object().shape({
  profession: yup.string().max(40, '⛔ Maximo de caracteres superado'),
});
