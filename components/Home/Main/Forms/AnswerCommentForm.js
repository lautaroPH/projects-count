import { Field, Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { AnswerFormValidation } from 'validations/AnswerFormValidation';
import { uploadAnswer } from 'firebaseFunction/uploadAnswer';

const AnswerCommentForm = ({ linkId, commentId, index }) => {
  const user = useUser();

  const textareaAnswer = document.getElementById(`answer-${index}`);

  const handleAutoResizeTextarea = (e) => {
    textareaAnswer.style.height = '45px';
    let scHeight = e.target.scrollHeight;
    textareaAnswer.style.height = scHeight + 'px';
  };

  return (
    <Formik
      initialValues={{ answer: '' }}
      validationSchema={AnswerFormValidation}
      onSubmit={async (values, { resetForm }) => {
        await uploadAnswer(linkId, user, values.answer, commentId);
        resetForm();
        textareaAnswer.style.height = '45px';
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <Form className="pb-1 bg-transparent rounded">
          <div className="flex w-full mb-2">
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
            <div className="w-full">
              <Field
                id={`answer-${index}`}
                as="textarea"
                className="w-full px-3 py-3 leading-tight text-gray-700 bg-transparent border border-gray-400 appearance-none resize-none h-11 textareaScrollNone dark:border-gray-500 rounded-3xl dark:text-white focus:outline-none focus:shadow-outline dark:placeholder-gray-400"
                name="answer"
                placeholder="Añadir una respuesta"
                required
                autoComplete="off"
                onKeyUp={handleAutoResizeTextarea}
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

export default AnswerCommentForm;
