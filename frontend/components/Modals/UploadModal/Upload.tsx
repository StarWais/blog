import { Box, IconButton, ScaleFade } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentUpload } from '../../../redux/uploads/uploads.slice';
import { deleteFile } from '../../../redux/uploads/uploads.thunks';
import { Picture } from '../../../types/Picture';
import { bytesToSize, getUploadUrl } from '../../../utils/helpers';

interface UploadProps {
  upload: Picture | File;
}

const getDetails = (upload: Picture | File) => {
  if (upload instanceof File) {
    return {
      fileName: upload.name,
      fileSize: upload.size,
      fileType: upload.type.split('/')[1],
      filePath: URL.createObjectURL(upload),
      createdAt: 0,
      id: 0,
      local: true,
    };
  }
  return {
    fileName: upload.fileName,
    fileSize: upload.fileSize,
    fileType: upload.fileType,
    filePath: getUploadUrl(upload),
    createdAt: upload.createdAt,
    id: upload.id,
    local: false,
  };
};

const Upload = ({ upload }: UploadProps) => {
  const details = getDetails(upload);
  const { fileName, fileSize, fileType, id, filePath, local } = details;
  const dispatch = useAppDispatch();
  const selectedUpload = useAppSelector(
    (state) => state.uploads.selectedUpload
  );
  const deletingUploadId = useAppSelector(
    (state) => state.uploads.deletingUploadId
  );
  const deletingState = useAppSelector((state) => state.uploads.deletingUpload);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <Box
      w="16rem"
      p={3}
      shadow={selectedUpload?.id === id ? 'lg' : 'none'}
      cursor={local ? 'default' : 'pointer'}
      onClick={
        local ? undefined : () => dispatch(setCurrentUpload(upload as Picture))
      }
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <Box position="relative" w="full" h="10rem">
        <Box position="absolute" w="full" h="full">
          {!local && (
            <ScaleFade initialScale={0.4} in={showDelete}>
              <IconButton
                aria-label="Remove upload"
                icon={<FaTrashAlt />}
                isLoading={
                  deletingUploadId === id && deletingState === 'pending'
                }
                position="absolute"
                onClick={() => dispatch(deleteFile(id))}
                right={2}
                top={2}
                zIndex={2}
              />
            </ScaleFade>
          )}
          <Image src={filePath} alt="uploaded image" layout="fill" />
        </Box>
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
