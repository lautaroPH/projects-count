import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import { commentFormSchema } from 'validations/CommentFormValidation';
import Image from 'next/image';
import { uploadComment } from 'firebaseFunction/uploadComment';
import TextareaAutosize from 'react-textarea-autosize';
import { editComment } from 'firebaseFunction/editComment';
import { useTheme } from 'next-themes';
import MensajeForCommentAndAnswerValidation from 'utils/MensajeForCommentAndAnswerValidation';

const FormComment = ({
  setOpenEditComment,
  comment,
  commentId,
  linkId,
  title,
  isEditing,
  userId,
  commentsNumber,
  setComments,
  comments,
  setLinks,
  links,
  setCommentsNumber,
}) => {
  const user = useUser();
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <Formik
      initialValues={{ comment: comment ? comment : '' }}
      validationSchema={commentFormSchema}
      onSubmit={async (values, { resetForm }) => {
        if (isEditing) {
          await editComment(
            linkId,
            commentId,
            values.comment,
            userId,
            comments,
            setComments,
            setLinks,
            links,
            currentTheme,
            setCommentsNumber
          );
          setOpenEditComment(false);
        } else {
          await uploadComment(
            linkId,
            user,
            values.comment,
            title,
            setComments,
            setLinks,
            links,
            currentTheme
          );
          setCommentsNumber(commentsNumber + 1);
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
                      values?.comment?.trim() === '' ||
                      errors?.comment ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </button>
                  <MensajeForCommentAndAnswerValidation
                    value={values?.comment?.trim().length}
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

export default FormComment;
