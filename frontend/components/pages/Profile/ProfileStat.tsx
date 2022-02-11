import { Box, HStack, VStack } from '@chakra-ui/react';
import { ReactChild } from 'react';

interface StatParams {
  title: string;
  description: string;
  icon: ReactChild;
}

const ProfileStat = ({ title, description, icon }: StatParams) => {
  return (
    <HStack spacing={5}>
      {icon}
      <VStack align="start">
        <Box color="black" fontWeight="semibold">
          {title}
        </Box>
        <Box color="gray.600" fontSize="sm">
          {description}
        </Box>
      </VStack>
    </HStack>
  );
};
export default ProfileStat;
