import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { uploadFile } from '../../../redux/uploads/uploads.thunks';
import Dropzone from '../../UI/Inputs/Dropzone';
import Upload from './Upload';

interface UserFileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserFileUploadModal = ({ isOpen, onClose }: UserFileUploadModalProps) => {
  const dispatch = useAppDispatch();
  const [upload, setUpload] = useState<File | null>(null);
  const uploadingState = useAppSelector((state) => state.uploads.uploading);

  useEffect(() => {
    if (uploadingState === 'succeeded') {
      onClose();
    }
  }, [uploadingState]);

  const handleFileUpload = (file: File) => {
    setUpload(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload file</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Dropzone onFileAccepted={handleFileUpload} />
          {upload && <Upload upload={upload} />}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup variant="solid">
            <Button
              colorScheme="blue"
              type="submit"
              disabled={!upload}
              onClick={() => dispatch(uploadFile(upload as File))}
              isLoading={uploadingState === 'pending'}
            >
              Upload
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default UserFileUploadModal;
