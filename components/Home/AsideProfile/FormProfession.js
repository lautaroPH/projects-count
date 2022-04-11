import { uploadUserProfession } from 'firebaseFunction/uploadUserProfession';
import { Form, Formik } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import MensajeForValidation from 'utils/MensajeForValidation';
import { ProfessionFormValidation } from 'validations/ProfessionFormValidation';

const FormProfession = ({ profession, userId, setOpenEditProfession }) => {
  return (
    <Formik
      initialValues={{ profession: profession ? profession : '' }}
      validationSchema={ProfessionFormValidation}
      onSubmit={async (values, { resetForm }) => {
        await uploadUserProfession(userId, values.profession.trim());
        setOpenEditProfession(false);
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form className="w-full pl-[18px]">
          <div>
            <div>
              <TextareaAutosize
                className="w-full leading-tight text-gray-700 bg-transparent border-gray-400 appearance-none resize-none focus:border focus:rounded-md dark:placeholder-gray-400 dark:text-white textareaScrollNone dark:border-gray-500 focus:outline-none focus:shadow-outline"
                value={values?.profession}
                onChange={handleChange}
                name="profession"
                placeholder="Escribe aquí tu profesión"
                autoComplete="off"
                autoFocus={true}
              />
              {values?.profession?.trim().length > 40 && (
                <small className="px-1 text-xs font-semibold text-red-500 dark:text-red-600">
                  {errors.profession}
                </small>
              )}

              {values?.profession?.trim() !== '' && (
                <div className="flex items-center mt-2 ">
                  <button
                    className="buttonCommentForm"
                    type="submit"
                    disabled={
                      values?.profession?.trim() === '' ||
                      errors?.profession ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </button>
                  <MensajeForValidation
                    value={values?.profession?.trim().length}
                    firstAlertNumber={20}
                    alertNumber={40}
                  />
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormProfession;
