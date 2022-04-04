import useUser from 'hooks/useUser';
import { useState } from 'react';
import { linkFormSchema } from 'validations/LinkFormValidation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTheme } from 'next-themes';
import { imageValidation } from 'utils/ImageValidation';
import Swal from 'sweetalert2';
import {
  swalUploadingLinkDark,
  swalUploadingLinkLight,
  swalUploadLinkSuccessDark,
  swalUploadLinkSuccessLight,
} from 'swals/swalsComponents';
import { uploadLink } from 'firebaseFunction/uploadLink';

const FormLinkEdit = ({
  setOpenFormEdit,
  id,
  userId,
  setLinks,
  setNoLinks,
  title,
  link,
  description,
  githubRepo,
  tecnologies,
  image,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorFileExtension, setErrorFileExtension] = useState('');
  const [erroFileSize, setErroFileSize] = useState('');
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const user = useUser();

  const handleUploadLink = (values) => {
    currentTheme === 'dark'
      ? Swal.fire(swalUploadingLinkDark(values?.title))
      : Swal.fire(swalUploadingLinkLight(values?.title));

    uploadLink(values, selectedFile, user).then(() => {
      currentTheme === 'dark'
        ? Swal.fire(swalUploadLinkSuccessDark(values?.title))
        : Swal.fire(swalUploadLinkSuccessLight(values?.title));
      setSelectedFile('');
      setOpenFormEdit(false);
    });
  };

  return (
    <Formik
      initialValues={{
        title,
        link,
        description,
        githubRepo,
        tecnologies,
      }}
      validationSchema={linkFormSchema}
      onSubmit={(values) => {
        return handleUploadLink(values);
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <Form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
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
              className="px-1 text-base text-red-800 dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
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
              className="px-1 text-base text-red-800 dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
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
              className="px-1 text-base text-red-800 dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
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
              className="px-1 text-base text-red-800 dark:text-red-600"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
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
              className="px-1 text-base text-red-800 dark:text-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-violet-700 dark:text-gray-100">
              Preview del proyecto (imagen)
            </label>
            <input
              className="w-full py-2 leading-tight rounded appearance-none text-violet-700 dark:text-gray-100 focus:outline-none dark:border-gray-500"
              type="file"
              name="imagen"
              onChange={(e) =>
                imageValidation(
                  e,
                  setErrorFileExtension,
                  setErroFileSize,
                  setSelectedFile
                )
              }
            />
            {errorFileExtension ? (
              <small className="px-1 text-base text-red-800 dark:text-red-600">
                {errorFileExtension}
              </small>
            ) : (
              erroFileSize && (
                <small className="px-1 text-base text-red-800 dark:text-red-600">
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
                values.title.trim() === '' ||
                values.link.trim() === '' ||
                values.description.trim() === '' ||
                errors.title ||
                errors.link ||
                errors.githubRepo ||
                errors.tecnologies ||
                errors.description ||
                errorFileExtension ||
                erroFileSize ||
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

export default FormLinkEdit;
