import { getFileExtension } from './getFileExtension';

export const imageValidation = (
  e,
  callbackErrorFileExtension,
  callbackErrorFileSize,
  callbackSelectedFile
) => {
  const file_extension = getFileExtension(e?.target?.files[0]?.name);
  const file_size = e?.target?.files[0]?.size;
  callbackErrorFileExtension('');
  callbackErrorFileSize('');

  if (!file_size || file_size < 1000000) {
    if (
      !file_extension ||
      file_extension === 'png' ||
      file_extension === 'jpg' ||
      file_extension === 'jpge' ||
      file_extension === 'gif' ||
      file_extension === 'webp'
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e?.target?.files[0]);

        reader.onload = (readerEvent) => {
          callbackSelectedFile(readerEvent.target.result);
        };
      }
    } else {
      callbackErrorFileExtension('Extension del archivo no valido');
    }
  } else {
    callbackErrorFileSize('Archivo muy pesado');
  }
};
