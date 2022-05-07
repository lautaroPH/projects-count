import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { AnswerFormValidation } from 'Validations/AnswerFormValidation';
import { uploadAnswer } from 'firebaseFunction/uploadAnswer';
import TextareaAutosize from 'react-textarea-autosize';
import { editAnswer } from 'firebaseFunction/editAnswer';
import { useTheme } from 'next-themes';
import MessageForValidation from 'utils/MensajeForValidation';

const FormCommentAnswer = ({
  linkId,
  commentId,
  setOpenForm,
  answer,
  id,
  isEditing,
  comments,
  setComments,
  setCommentsNumber,
  setOpenAnswers,
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
          await editAnswer(linkId, commentId, id, values.answer, user?.id);
          setOpenForm(false);
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
          setOpenForm(false);
          setOpenAnswers(true);
        }
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form className={`${!isEditing && `pt-2 pl-4 rounded bg-transparent`}`}>
          <div className={`${!isEditing && `flex w-full mb-4`}`}>
            {!isEditing && (
              <div className="w-10 h-10 mr-2 md:w-12 md:h-12">
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
            <div className={`${!isEditing && `w-[90%] flex items-center`}`}>
              <TextareaAutosize
                className={`${
                  isEditing && `focus:border focus:rounded-md`
                } w-full leading-tight dark:placeholder-gray-400 dark:text-white text-gray-700 bg-transparent border-gray-400 appearance-none resize-none textareaScrollNone dark:border-gray-500  focus:outline-none focus:shadow-outline`}
                value={values.answer}
                onChange={handleChange}
                name="answer"
                placeholder={
                  isEditing ? 'Editar comentario' : 'Añadir una respuesta'
                }
                autoComplete="off"
                autoFocus={true}
              />
            </div>
          </div>
          <div
            className={`${
              isEditing && `justify-end`
            } flex items-center justify-end w-full mt-2`}
          >
            {values.answer.trim().length > 1250 && (
              <small className="px-1 mr-2 text-sm font-semibold text-red-500 dark:text-red-600">
                {errors.answer}
              </small>
            )}
            <MessageForValidation
              value={values.answer.trim().length}
              firstAlertNumber={1200}
              alertNumber={1250}
            />
            <button
              className={`${
                isEditing
                  ? `pr-2 text-sm font-semibold text-violet-600 hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline dark:text-white ml-2`
                  : `buttonCommentForm ml-2`
              }`}
              type="submit"
              disabled={
                values.answer.trim() === '' || errors.answer || isSubmitting
              }
            >
              {isSubmitting ? 'Respondiendo...' : 'Responder'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormCommentAnswer;
