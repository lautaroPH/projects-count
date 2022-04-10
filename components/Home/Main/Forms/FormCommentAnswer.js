import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { AnswerFormValidation } from 'validations/AnswerFormValidation';
import { uploadAnswer } from 'firebaseFunction/uploadAnswer';
import TextareaAutosize from 'react-textarea-autosize';
import { editAnswer } from 'firebaseFunction/editAnswer';
import { useTheme } from 'next-themes';
import MensajeForCommentAndAnswerValidation from 'utils/MensajeForCommentAndAnswerValidation';

const FormCommentAnswer = ({
  linkId,
  commentId,
  setOpenEditAnswer,
  answer,
  id,
  isEditing,
  comments,
  setComments,
  setCommentsNumber,
}) => {
  const user = useUser();
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <Formik
      initialValues={{ answer: answer ? answer : '' }}
      validationSchema={AnswerFormValidation}
      onSubmit={async (values, { resetForm }) => {
        if (isEditing) {
          await editAnswer(linkId, commentId, id, values.answer);
          setOpenEditAnswer(false);
        } else {
          await uploadAnswer(
            linkId,
            user,
            values.answer,
            commentId,
            comments,
            setComments,
            currentTheme,
            setCommentsNumber
          );
        }
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form
          className={`${
            !isEditing &&
            `flex justify-center w-full pb-1 bg-transparent rounded`
          }`}
        >
          {!isEditing && (
            <div className="mt-1 mr-1 w-9 h-9">
              {user?.avatar && (
                <Image
                  src={user?.avatar}
                  alt={user?.username}
                  width={150}
                  height={150}
                  layout="responsive"
                  className="rounded-full"
                />
              )}
            </div>
          )}

          <div className={`${!isEditing && `flex w-[90%] mb-2`}`}>
            <div className="w-full">
              <TextareaAutosize
                className={`${
                  isEditing
                    ? `focus:border focus:rounded-md`
                    : `px-3 py-3 border rounded-3xl `
                } w-full leading-tight dark:placeholder-gray-400 dark:text-white text-gray-700 bg-transparent border-gray-400 appearance-none resize-none textareaScrollNone dark:border-gray-500  focus:outline-none focus:shadow-outline`}
                value={values.answer}
                onChange={handleChange}
                name="answer"
                placeholder="Añadir una respuesta"
                autoComplete="off"
                autoFocus={true}
              />
              {values.answer.trim().length > 1250 && (
                <small className="px-1 text-sm font-semibold text-red-500 dark:text-red-600">
                  {errors.answer}
                </small>
              )}

              {values.answer.trim() !== '' && (
                <div
                  className={`${
                    isEditing && `justify-end`
                  } flex items-center mt-2`}
                >
                  <button
                    className={`${
                      isEditing
                        ? `pr-2 text-sm font-semibold text-violet-600 hover:underline dark:text-white`
                        : `buttonCommentForm`
                    }`}
                    type="submit"
                    disabled={
                      values.answer.trim() === '' ||
                      errors.answer ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Respondiendo...' : 'Responder'}
                  </button>

                  <MensajeForCommentAndAnswerValidation
                    value={values.answer.trim().length}
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

export default FormCommentAnswer;
