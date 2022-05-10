import { uploadUserProfile } from 'firebaseFunction/uploadUserProfile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTheme } from 'next-themes';
import TextareaAutosize from 'react-textarea-autosize';
import { swalUploadUserProfileDark } from 'swals/dark/swalUploadUserProfileDark';
import { swalUploadUserProfileLight } from 'swals/light/swalUploadUserProfileLight';
import Swal from 'sweetalert2';
import MessageForValidation from 'utils/MensajeForValidation';
import { UserProfileFormValidation } from 'Validations/UserProfileFormValidation';

const FormUserProfile = ({
  userId,
  aboutMe,
  profession,
  setOpenForm,
  portfolio,
}) => {
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Formik
      initialValues={{
        aboutMe: aboutMe ? aboutMe : '',
        profession: profession ? profession : '',
        portfolio: portfolio ? portfolio : '',
      }}
      validationSchema={UserProfileFormValidation}
      onSubmit={async (values) => {
        setOpenForm(false);
        currentTheme === 'dark'
          ? Swal.fire(swalUploadUserProfileDark)
          : Swal.fire(swalUploadUserProfileLight);
        await uploadUserProfile(
          userId,
          values.aboutMe.trim(),
          values.profession.trim(),
          values.portfolio.trim()
        );
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form className="w-full">
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
                placeholder="Profesion"
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
                Portfolio
              </label>
              <Field
                className={`${
                  errors.profession &&
                  'border border-red-700 dark:border-red-700'
                } inputLinks`}
                name="portfolio"
                placeholder="Portfolio"
                autoComplete="off"
                type="text"
              />
              <ErrorMessage
                name="portfolio"
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
                  errors.aboutMe && 'border border-red-700 dark:border-red-700'
                } textareaScrollNone inputLinks resize-none h-auto`}
                value={values.aboutMe}
                onChange={handleChange}
                name="aboutMe"
                placeholder="Sobre mi"
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
                <MessageForValidation
                  value={values?.aboutMe?.trim().length}
                  firstAlertNumber={750}
                  alertNumber={800}
                />
              </div>
            </div>
            <div className="flex items-center mt-2 ">
              <button
                className="buttonFormSumbit"
                type="submit"
                disabled={
                  errors?.aboutMe ||
                  errors?.profession ||
                  errors?.portfolio ||
                  isSubmitting
                }
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
