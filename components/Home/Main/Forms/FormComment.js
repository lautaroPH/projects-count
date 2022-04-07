import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import { commentFormSchema } from 'validations/CommentFormValidation';
import Image from 'next/image';
import { uploadComment } from 'firebaseFunction/uploadComment';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import { editComment } from 'firebaseFunction/editComment';

const FormComment = ({
  setOpenEditComment,
  comment,
  commentId,
  linkId,
  title,
  isEditing,
  userId,
}) => {
  const user = useUser();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ comment: comment ? comment : '' }}
      validationSchema={commentFormSchema}
      onSubmit={async (values, { resetForm }) => {
        if (isEditing) {
          await editComment(linkId, commentId, values.comment, userId);
          setOpenEditComment(false);
        } else {
          await uploadComment(linkId, user, values.comment, title, router);
        }
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form
          className={`${
            !isEditing && `pt-2 mb-4 ml-4 mr-4 rounded`
          } bg-transparent `}
        >
          <div className={`${!isEditing && `flex w-full mb-4`}`}>
            {!isEditing && (
              <div className="w-12 h-12 mr-2">
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

            <div className={`${!isEditing && `w-full`}`}>
              <TextareaAutosize
                className={`${
                  isEditing
                    ? `focus:border focus:rounded-md`
                    : `px-3 py-3 border rounded-3xl `
                } w-full leading-tight dark:placeholder-gray-400 dark:text-white text-gray-700 bg-transparent border-gray-400 appearance-none resize-none textareaScrollNone dark:border-gray-500  focus:outline-none focus:shadow-outline`}
                value={values?.comment}
                onChange={handleChange}
                name="comment"
                placeholder={
                  isEditing ? 'Editar comentario' : 'Escribe tu comentario'
                }
                autoComplete="off"
                autoFocus={true}
              />
              {values?.comment?.trim().length > 1250 && (
                <small className="px-1 text-sm font-semibold text-red-500 dark:text-red-600">
                  {errors.comment}
                </small>
              )}

              {values?.comment?.trim() !== '' && (
                <div className="flex items-center mt-2">
                  <button
                    className="bg-violet-700 border border-violet-800 text-white  px-2 rounded-full font-semibold text-sm py-[2px]
                    dark:border-white dark:bg-white  dark:text-black  
                    hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white hover:text-black
                    transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-violet-700
                    disabled:hover:text-white dark:disabled:hover:text-black dark:disabled:opacity-60 dark:disabled:hover:bg-white"
                    type="submit"
                    disabled={
                      values?.comment?.trim() === '' ||
                      errors?.comment ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </button>
                  {isEditing && (
                    <button
                      className="ml-2 bg-transparent border border-violet-800 text-dark  px-2 rounded-full font-semibold text-sm py-[2px]
                        dark:border-white dark:bg-transparent  dark:text-white  
                        hover:bg-violet-700 dark:hover:bg-white dark:hover:text-black hover:text-white
                        transition-all duration-300 "
                      onClick={() => setOpenEditComment(false)}
                    >
                      Cancelar
                    </button>
                  )}
                  {values?.comment?.trim().length >= 1200 &&
                    values?.comment?.trim().length <= 1250 && (
                      <p className="ml-3 text-sm font-semibold text-violet-600 dark:text-gray-300">
                        {values?.comment?.trim().length}
                      </p>
                    )}
                  {values?.comment?.trim().length > 1250 && (
                    <p className="ml-3 text-sm font-semibold text-red-500 dark:text-red-600 mt-[-5px]">
                      <span className="-mt-48 text-base">-</span>
                      {values?.comment?.trim().length - 1250}
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
