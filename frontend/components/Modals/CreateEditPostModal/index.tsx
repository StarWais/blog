import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../UI/Inputs/FormInput';
import { CreatePostInput } from '../../../api/posts.api';
import validationSchema from './validation';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import dynamic from 'next/dynamic';
import { createPost, updatePost } from '../../../redux/posts/post.thunks';
import ModalPostPicture from './ModalPostPicture';
import { useEffect } from 'react';
import {
  resetLoadingState,
  setEditblePost,
} from '../../../redux/posts/post.slice';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface CreateEditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEditPostModal = ({ isOpen, onClose }: CreateEditPostModalProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const editablePost = useAppSelector((state) => state.posts.editablePost);
  const handleClose = () => {
    dispatch(setEditblePost(null));
    onClose();
  };

  const uploadingState = useAppSelector(
    (state) => state.posts.creatingUpdatingPost
  );

  useEffect(() => {
    if (uploadingState === 'succeeded') {
      toast({
        status: 'success',
        title: `Success`,
        isClosable: true,
      });
      onClose();
      dispatch(resetLoadingState());
    }
  }, [uploadingState]);

  const onSubmit = (values: CreatePostInput) => {
    if (editablePost) {
      dispatch(
        updatePost({
          details: values,
          updatePostId: editablePost.id,
        })
      );
    } else {
      dispatch(createPost(values));
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,

    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: editablePost?.title || '',
      content: editablePost?.content || '',
    },
  });
  const watchContent = watch('content');

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{editablePost ? 'Update' : 'Create'} post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <FormInput name="title" label="Title" control={control} />
              <ModalPostPicture
                onPictureIdChange={async (pictureId) => {
                  setValue('pictureId', pictureId);
                  await trigger('pictureId');
                }}
                picture={editablePost?.picture}
                error={errors.pictureId?.message}
              />
              <MDEditor
                value={watchContent}
                onChange={async (val) => {
                  setValue('content', val ? val : '');
                  await trigger('content');
                }}
              />
              {errors.content && (
                <Text color="red.400" textAlign="center" as="div">
                  {errors.content.message}
                </Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="solid">
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={uploadingState === 'pending'}
              >
                {editablePost ? 'Update' : 'Create'} post
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default CreateEditPostModal;
