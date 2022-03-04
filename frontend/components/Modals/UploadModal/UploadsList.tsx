import { Center, Wrap } from '@chakra-ui/react';
import _ from 'lodash';
import { Picture } from '../../../types/Picture';
import Upload from './Upload';

interface UploadsListProps {
  uploads: Picture[] | File[];
}

const UploadsList = ({ uploads }: UploadsListProps) => {
  if (_.isEmpty(uploads))
    return (
      <Center my={10} fontSize="lg">
        No files availiable
      </Center>
    );
  return (
    <Wrap spacing={3} maxH="lg" overflowY="auto" overflowX="hidden">
      {uploads.map((upload, index) => (
        <Upload
          key={upload instanceof File ? index : upload.id}
          upload={upload}
        />
      ))}
    </Wrap>
  );
};

export default UploadsList;
