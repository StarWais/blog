import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentUpload } from '../../../redux/uploads/uploads.slice';
import { Picture } from '../../../types/Picture';
import { bytesToSize, getUploadUrl } from '../../../utils/helpers';

interface UploadProps {
  upload: Picture | File;
}

const Upload = ({ upload }: UploadProps) => {
  const details = {
    fileName: upload instanceof File ? upload.name : upload.fileName,
    fileSize: upload instanceof File ? upload.size : upload.fileSize,
    fileType:
      upload instanceof File ? upload.type.split('/')[1] : upload.fileType,
    filePath:
      upload instanceof File
        ? URL.createObjectURL(upload)
        : getUploadUrl(upload),
    createdAt: upload instanceof File ? 0 : upload.createdAt,
    id: upload instanceof File ? 0 : upload.id,
    local: upload instanceof File ? true : false,
  };
  const { fileName, fileSize, fileType, id, filePath, local } = details;
  const dispatch = useAppDispatch();
  const selectedUploadId = useAppSelector(
    (state) => state.uploads.selectedUploadId
  );
  return (
    <Box
      w="17rem"
      p={3}
      shadow={selectedUploadId === id ? 'lg' : 'none'}
      cursor={local ? 'default' : 'pointer'}
      onClick={local ? undefined : () => dispatch(setCurrentUpload(id))}
    >
      <Box position="relative" w="full" h="10rem">
        <Image src={filePath} alt="uploaded image" layout="fill" />
      </Box>
      <Box mt={3}>
        <Box fontWeight="semibold">
          {fileName.length > 25 ? `${fileName.substring(0, 25)}...` : fileName}
        </Box>
        <Box color="gray.600" fontSize="sm" textTransform="uppercase">
          {fileType} - {bytesToSize(fileSize)}
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
