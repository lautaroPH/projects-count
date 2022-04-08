import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { AnswerFormValidation } from 'validations/AnswerFormValidation';
import { uploadAnswer } from 'firebaseFunction/uploadAnswer';
import TextareaAutosize from 'react-textarea-autosize';
import { editAnswer } from 'firebaseFunction/editAnswer';

const FormCommentAnswer = ({
  linkId,
  commentId,
  setOpenEditAnswer,
  answer,
  id,
  isEditing,
  comments,
  setComments,
}) => {
  const user = useUser();

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
            setComments
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
                <div className="flex items-center mt-2">
                  <button
                    className="bg-violet-700 border border-violet-800 text-white  px-2 rounded-full font-semibold text-sm py-[2px]
                      dark:border-white dark:bg-white  dark:text-black  
                      hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white hover:text-black
                      transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-violet-700
                      disabled:hover:text-white dark:disabled:hover:text-black dark:disabled:opacity-60 dark:disabled:hover:bg-white"
                    type="submit"
                    disabled={
                      values.answer.trim() === '' ||
                      errors.answer ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Respondiendo...' : 'Responder'}
                  </button>
                  {isEditing && (
                    <button
                      className="ml-2 bg-transparent border border-violet-800 text-dark  px-2 rounded-full font-semibold text-sm py-[2px]
                    dark:border-white dark:bg-transparent  dark:text-white  
                    hover:bg-violet-700 dark:hover:bg-white dark:hover:text-black hover:text-white
                    transition-all duration-300 "
                      onClick={() => setOpenEditAnswer(false)}
                    >
                      Cancelar
                    </button>
                  )}
                  {values.answer.trim().length >= 1200 &&
                    values.answer.trim().length <= 1250 && (
                      <p className="ml-3 text-sm font-semibold text-violet-600 dark:text-gray-300">
                        {values.answer.trim().length}
                      </p>
                    )}
                  {values.answer.trim().length > 1250 && (
                    <p className="ml-3 text-sm font-semibold text-red-500 dark:text-red-600 mt-[-5px]">
                      <span className="-mt-48 text-base">-</span>
                      {values.answer.trim().length - 1250}
                    </p>
                  )}
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
