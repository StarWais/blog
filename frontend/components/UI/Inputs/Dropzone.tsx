import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  disabled?: boolean;
}

export default function Dropzone({
  onFileAccepted,
  disabled = false,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
    multiple: false,
    disabled,
  });

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : "Drag 'n' drop image here, or click to select file";

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500'
  );

  return (
    <Center
      p={10}
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: disabled ? 'none' : activeBg }}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={AiFillFileAdd} mr={2} />
      <p>{dropText}</p>
    </Center>
  );
}
