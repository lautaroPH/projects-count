import { uploadLink } from 'firebaseMain/firebaseFunction';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { getFileExtension } from 'utils/getFileExtension';
import { linkFormSchema } from 'validations/LinkFormValidation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTheme } from 'next-themes';

const FormLink = ({ setOpenForm }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorFileExtension, setErrorFileExtension] = useState('');
  const [erroFileSize, setErroFileSize] = useState('');
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const user = useUser();

  const handleUploadLink = async (values) => {
    await uploadLink(values, selectedFile, user, currentTheme);
    setSelectedFile('');
    setOpenForm(false);
  };

  const handleImage = (e) => {
    const file_extension = getFileExtension(e?.target?.files[0]?.name);
    const file_size = e?.target?.files[0]?.size;
    setErrorFileExtension('');
    setErroFileSize('');

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
            setSelectedFile(readerEvent.target.result);
          };
        } else {
          setSelectedFile('');
        }
      } else {
        setErrorFileExtension('Extension del archivo no valido');
        setSelectedFile('');
      }
    } else {
      setErroFileSize('Archivo muy pesado');
      setSelectedFile('');
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        link: '',
        description: '',
        githubRepo: '',
        tecnologies: '',
      }}
      validationSchema={linkFormSchema}
      onSubmit={(values) => {
        return handleUploadLink(values);
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold mb-2">
              Titulo
            </label>
            <Field
              className={`${
                errors.title && 'border border-red-700 dark:border-red-700'
              } inputLinks`}
              name="title"
              placeholder="Titulo de la página"
              autoComplete="off"
              type="text"
            />
            <ErrorMessage
              name="title"
              component="small"
              className="px-1 text-red-800 text-base dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold mb-2">
              Link
            </label>
            <Field
              className={`${
                errors.link && 'border border-red-700 dark:border-red-700'
              } inputLinks`}
              name="link"
              placeholder="https://example.com"
              autoComplete="off"
              type="link"
            />
            <ErrorMessage
              name="link"
              component="small"
              className="px-1 text-red-800 text-base dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold mb-2">
              Repositorio (opcional)
            </label>
            <Field
              className={`${
                errors.githubRepo && 'border border-red-700 dark:border-red-700'
              } inputLinks`}
              name="githubRepo"
              placeholder="Repositorio de github"
              autoComplete="off"
              type="link"
            />
            <ErrorMessage
              name="githubRepo"
              component="small"
              className="px-1 text-red-800 text-base dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold mb-2">
              Tecnologías (opcional)
            </label>
            <Field
              className={`${
                errors.tecnologies &&
                'border border-red-700 dark:border-red-700'
              } inputLinks`}
              name="tecnologies"
              placeholder="React, CSS, Node (separadas por , )"
              type="text"
              autoComplete="off"
            />
            <ErrorMessage
              name="tecnologies"
              component="small"
              className="px-1 text-red-800 text-base dark:text-red-600"
            />
          </div>
          <div className="mb-2">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold mb-2">
              Descripción
            </label>
            <Field
              as="textarea"
              className={`${
                errors.description &&
                'border border-red-700 dark:border-red-700'
              } inputLinks resize-y`}
              name="description"
              placeholder="Descripción de la página, tiempo en desarrollo, etc"
              rows="5"
              autoComplete="off"
            />
            <ErrorMessage
              name="description"
              component="small"
              className="px-1 text-red-800 text-base dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-violet-700 dark:text-gray-100 text-sm font-bold">
              Preview del proyecto (imagen)
            </label>
            <input
              className="appearance-none rounded w-full py-2 text-violet-700 dark:text-gray-100 leading-tight focus:outline-none  dark:border-gray-500"
              type="file"
              name="imagen"
              onChange={handleImage}
            />
            {errorFileExtension ? (
              <small className="px-1 text-red-800 text-base dark:text-red-600">
                {errorFileExtension}
              </small>
            ) : (
              erroFileSize && (
                <small className="px-1 text-red-800 text-base dark:text-red-600">
                  {erroFileSize}
                </small>
              )
            )}
          </div>
          <div className="flex justify-evenly">
            <button
              className="buttonFormSumbit"
              type="submit"
              disabled={
                values.title === '' ||
                values.link === '' ||
                values.description === '' ||
                isSubmitting
              }
            >
              {isSubmitting ? 'Guardandose...' : 'Guardar'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormLink;
