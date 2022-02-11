import {
  Button,
  ButtonGroup,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FormEvent, useEffect } from 'react';
import { getMyUploads } from '../../../redux/uploads/uploads.thunks';
import UploadsList from './UploadsList';
import { reset } from '../../../redux/uploads/uploads.slice';
import UserFileUploadModal from './UserFIleUploadModal';

interface UploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (uploadId: number) => void;
}

const UploadForm = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: UploadFormProps) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenFileUploadModal,
    onOpen: onOpenUploadModal,
    onClose: onCloseUploadModal,
  } = useDisclosure();
  const isFetchingUploads = useAppSelector(
    (state) => state.uploads.loadingUploads === 'pending'
  );
  const myUploads = useAppSelector((state) => state.uploads.myUploads);
  const selectedUpload = useAppSelector(
    (state) => state.uploads.selectedUploadId
  );
  useEffect(() => {
    dispatch(getMyUploads());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUpload) return;
    onSubmit(selectedUpload);
    handleClose();
  };

  const handleClose = () => {
    dispatch(reset());
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Select file</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button
                colorScheme="blue"
                ml="auto"
                my={2}
                display="block"
                onClick={onOpenUploadModal}
              >
                Upload new assets
              </Button>
              {isFetchingUploads ? (
                <Center>
                  <Spinner size="md" />
                </Center>
              ) : (
                <UploadsList uploads={myUploads} />
              )}
            </ModalBody>
            <ModalFooter>
              <ButtonGroup variant="solid">
                <Button
                  colorScheme="blue"
                  type="submit"
                  disabled={!selectedUpload}
                  isLoading={isLoading}
                >
                  Upload
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <UserFileUploadModal
        isOpen={isOpenFileUploadModal}
        onClose={onCloseUploadModal}
      />
    </>
  );
};
export default UploadForm;
