import { uploadUserProfile } from 'firebaseFunction/uploadUserProfile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import MensajeForValidation from 'utils/MensajeForValidation';
import { UserProfileFormValidation } from 'validations/UserProfileFormValidation';

const FormUserProfile = ({ userId, aboutMe, profession, setOpenForm }) => {
  return (
    <Formik
      initialValues={{
        aboutMe: aboutMe ? aboutMe : '',
        profession: profession ? profession : '',
      }}
      validationSchema={UserProfileFormValidation}
      onSubmit={async (values, { resetForm }) => {
        await uploadUserProfile(
          userId,
          values.aboutMe.trim(),
          values.profession.trim()
        );
        setOpenForm(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form className="w-full pl-[18px]">
          <div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
                Profesion
              </label>
              <Field
                className={`${
                  errors.profession &&
                  'border border-red-700 dark:border-red-700'
                } inputLinks`}
                name="profession"
                placeholder="Titulo de la página"
                autoComplete="off"
                type="text"
              />
              <ErrorMessage
                name="profession"
                component="small"
                className="px-1 text-base text-red-800 dark:text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-violet-700 dark:text-gray-100">
                Sobre mi
              </label>
              <TextareaAutosize
                className={`${
                  errors.description &&
                  'border border-red-700 dark:border-red-700'
                } textareaScrollNone inputLinks resize-none h-auto`}
                value={values.aboutMe}
                onChange={handleChange}
                name="aboutMe"
                placeholder="Escribe aquí tu profesión"
                autoComplete="off"
                minRows={5}
                rows={5}
              />

              <div className="flex items-center">
                {errors.aboutMe && (
                  <small className="px-1 text-xs font-semibold text-red-500 dark:text-red-600">
                    {errors.aboutMe}
                  </small>
                )}
                <MensajeForValidation
                  value={values?.aboutMe?.trim().length}
                  firstAlertNumber={350}
                  alertNumber={400}
                />
              </div>
            </div>

            <div className="flex items-center mt-2 ">
              <button
                className="buttonFormSumbit"
                type="submit"
                disabled={errors?.aboutMe || errors?.profession || isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormUserProfile;
