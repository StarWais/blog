import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Picture } from '../../../types/Picture';
import { getUploadUrl } from '../../../utils/helpers';
import UploadForm from '../UploadModal';

interface ModalPostPictureProps {
  picture?: Picture;
  onPictureIdChange: (pictureId: number) => void;
  error?: string;
}

const ModalPostPicture = ({
  picture,
  onPictureIdChange,
  error,
}: ModalPostPictureProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [onImageHovered, setOnImageHovered] = useState(false);
  const [pictureSelected, setPictureSelected] = useState<Picture | undefined>(
    picture
  );

  const handleSubmit = (picture: Picture) => {
    setPictureSelected(picture);
  };

  useEffect(() => {
    if (pictureSelected) {
      onPictureIdChange(pictureSelected.id);
    }
  }, [pictureSelected]);

  return (
    <>
      {!pictureSelected ? (
        <Box>
          <Button
            display="block"
            mx="auto"
            maxW="fit-content"
            colorScheme="blue"
            onClick={onOpen}
          >
            Select image
          </Button>
        </Box>
      ) : (
        <Box
          position="relative"
          height="sm"
          onMouseEnter={() => setOnImageHovered(true)}
          onMouseLeave={() => setOnImageHovered(false)}
        >
          {onImageHovered && (
            <Stack
              w="full"
              h="full"
              position="absolute"
              zIndex={3}
              bg="rgba(255,255,255,0.5)"
              align="center"
              justify="center"
            >
              <Button
                display="block"
                maxW="fit-content"
                colorScheme="blue"
                onClick={onOpen}
              >
                Change image
              </Button>
            </Stack>
          )}
          <Box position="absolute" h="full" w="full" zIndex={2}>
            <Image
              src={getUploadUrl(pictureSelected)}
              alt="post picture"
              layout="fill"
            />
          </Box>
        </Box>
      )}
      {error && (
        <Text color="red.400" textAlign="center" as="div">
          {error}
        </Text>
      )}
      <UploadForm
        onClose={onClose}
        isOpen={isOpen}
        isLoading={false}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ModalPostPicture;
