import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import { commentFormSchema } from 'Validations/CommentFormValidation';
import Image from 'next/image';
import { uploadComment } from 'firebaseFunction/uploadComment';
import TextareaAutosize from 'react-textarea-autosize';
import { editComment } from 'firebaseFunction/editComment';
import { useTheme } from 'next-themes';
import MessageForValidation from 'utils/MensajeForValidation';
import { useRouter } from 'next/router';

const FormComment = ({
  setOpenForm,
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
  isOneLink,
  setOpenComments,
}) => {
  const user = useUser();
  const router = useRouter();
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
            setCommentsNumber,
            isOneLink,
            router
          );
          setOpenForm(false);
        } else {
          await uploadComment(
            linkId,
            user,
            values.comment,
            title,
            setComments,
            setLinks,
            links,
            currentTheme,
            isOneLink,
            router
          );
          setCommentsNumber(commentsNumber + 1);
          setOpenForm(false);
          setOpenComments(true);
        }
        resetForm();
      }}
    >
      {({ values, isSubmitting, errors, handleChange }) => (
        <Form
          className={`${!isEditing && `pt-2 pl-4 rounded`} bg-transparent `}
        >
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
                value={values?.comment}
                onChange={handleChange}
                name="comment"
                placeholder={
                  isEditing ? 'Editar comentario' : 'Escribe tu comentario'
                }
                autoComplete="off"
                autoFocus={true}
              />
            </div>
          </div>
          <div
            className={`${
              isEditing && `justify-end`
            } flex items-center justify-end mt-2 w-full`}
          >
            {values?.comment?.trim().length > 1250 && (
              <small className="px-1 mr-2 text-sm font-semibold text-red-500 dark:text-red-600">
                {errors.comment}
              </small>
            )}
            <MessageForValidation
              value={values?.comment?.trim().length}
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
                values?.comment?.trim() === '' ||
                errors?.comment ||
                isSubmitting
              }
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComment;
