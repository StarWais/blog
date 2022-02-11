import { Box, HStack } from '@chakra-ui/react';

interface ProfileRecentPostStatProps {
  icon: React.ReactNode;
  text: string | number;
}

const ProfileRecentPostStat = ({ icon, text }: ProfileRecentPostStatProps) => {
  return (
    <HStack spacing={3}>
      {icon}
      <Box color="black">{text}</Box>
    </HStack>
  );
};

export default ProfileRecentPostStat;
