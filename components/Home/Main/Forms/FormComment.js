import { Field, Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import { commentFormSchema } from 'validations/CommentFormValidation';
import Image from 'next/image';
import { uploadComment } from 'firebaseFunction/uploadComment';
import { useRouter } from 'next/router';

const FormComment = ({ id, title }) => {
  const user = useUser();

  const textareaComment = document.getElementById('comment');
  const router = useRouter();

  const handleAutoResizeTextarea = (e) => {
    textareaComment.style.height = '48px';
    let scHeight = e.target.scrollHeight;
    textareaComment.style.height = scHeight + 'px';
  };

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={commentFormSchema}
      onSubmit={async (values, { resetForm }) => {
        await uploadComment(id, user, values.comment, title, router);
        resetForm();
        textareaComment.style.height = '48px';
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <Form className="pt-2 mb-4 ml-4 mr-4 bg-transparent rounded">
          <div className="flex w-full mb-4">
            <div className="mr-2 h-14 w-14">
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
                id="comment"
                as="textarea"
                className="w-full h-12 px-3 py-3 leading-tight text-gray-700 bg-transparent border border-gray-400 appearance-none resize-none textareaScrollNone dark:border-gray-500 rounded-3xl dark:text-white focus:outline-none focus:shadow-outline dark:placeholder-gray-400"
                name="comment"
                placeholder="Escribe tu comentario"
                required
                autoComplete="off"
                onKeyUp={handleAutoResizeTextarea}
              />
              {values.comment.trim().length > 1250 && (
                <small className="px-1 text-sm font-semibold text-red-500 dark:text-red-600">
                  {errors.comment}
                </small>
              )}

              {values.comment.trim() !== '' && (
                <div className="flex items-center mt-2">
                  <button
                    className="bg-violet-700 border border-violet-800 text-white  px-2 rounded-full font-semibold text-sm py-[2px]
                    dark:border-white dark:bg-white  dark:text-black  
                    hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white hover:text-black
                    transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-violet-700
                    disabled:hover:text-white dark:disabled:hover:text-black dark:disabled:opacity-60 dark:disabled:hover:bg-white"
                    type="submit"
                    disabled={
                      values.comment.trim() === '' ||
                      errors.comment ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </button>
                  {values.comment.trim().length >= 1200 &&
                    values.comment.trim().length <= 1250 && (
                      <p className="ml-3 text-sm font-semibold text-violet-600 dark:text-gray-300">
                        {values.comment.trim().length}
                      </p>
                    )}
                  {values.comment.trim().length > 1250 && (
                    <p className="ml-3 text-sm font-semibold text-red-500 dark:text-red-600 mt-[-5px]">
                      <span className="-mt-48 text-base">-</span>
                      {values.comment.trim().length - 1250}
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

export default FormComment;
