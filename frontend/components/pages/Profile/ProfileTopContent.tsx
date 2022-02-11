import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Profile } from '../../../types/User';
import { getUploadUrl } from '../../../utils/helpers';

export interface ProfileProps {
  profile: Profile;
}

const ProfileTopContent = ({ profile }: ProfileProps) => {
  console.log(profile);
  return (
    <HStack spacing={10}>
      <Avatar
        name={profile.name}
        src={getUploadUrl(profile.picture)}
        width="14rem"
        height="14rem"
        borderRadius="0.5em"
      />
      <VStack align="start" spacing={4}>
        <Heading as="h1">{profile.name}</Heading>
        <Text fontSize="lg" color="gray.600" whiteSpace="pre-line">
          {profile.description || 'No description'}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ProfileTopContent;
