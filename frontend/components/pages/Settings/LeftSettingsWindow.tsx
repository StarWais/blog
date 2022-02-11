import {
  Avatar,
  Box,
  Button,
  Text,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateAvatar } from '../../../redux/auth/auth.thunks';
import { User } from '../../../types/User';
import { getUploadUrl } from '../../../utils/helpers';
import UploadForm from '../../Modals/UploadModal';

interface LeftSettingsWindowProps {
  user: User;
}

const LeftSettingsWindow = ({ user }: LeftSettingsWindowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isUpdatingAvatar = useAppSelector(
    (state) => state.auth.isUpdatingAvatar === 'pending'
  );
  const dispatch = useAppDispatch();
  const handleSubmit = (uploadId: number) => {
    dispatch(
      updateAvatar({
        pictureId: uploadId,
      })
    );
  };
  return (
    <>
      <Box w="35%" shadow="sm" bg="gray.50" p={10}>
        <VStack spacing={4}>
          <Heading as="h3" mb={5}>
            {user.name}
          </Heading>
          <Avatar
            name={user.name}
            src={getUploadUrl(user.picture)}
            size="2xl"
          />
          <Button
            display="block"
            variant="solid"
            colorScheme="blue"
            onClick={onOpen}
          >
            Upload New Photo
          </Button>
          <Text bg="gray.100" p={4} textAlign="center" display="block" mt={16}>
            Upload a new avatar. Larger image will be resized automatically.
            <span
              style={{
                display: 'block',
                marginTop: '1rem',
              }}
            >
              Maximum upload size is <b>1MB</b>
            </span>
          </Text>
          <Box fontSize="sm">
            Member since <b>{moment(user.createdAt).format('MMMM YYYY')}</b>
          </Box>
        </VStack>
      </Box>

      <UploadForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isUpdatingAvatar}
      />
    </>
  );
};

export default LeftSettingsWindow;
