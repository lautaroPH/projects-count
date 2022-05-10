import * as yup from 'yup';

export const UserProfileFormValidation = yup.object().shape({
  aboutMe: yup.string().max(400, '⛔ Maximo de caracteres superado'),
  profession: yup.string().max(40, '⛔ Maximo de caracteres superado'),
  portfolio: yup.string().url('Url no valida'),
});
