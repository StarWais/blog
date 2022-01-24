import { Box, Container, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

interface TopContentProps {
  title: string;
  description: string;
  imageLink: string;
}

const TopContent = ({ title, description, imageLink }: TopContentProps) => (
  <Box bg="gray.50">
    <Container
      maxW="8xl"
      mx="auto"
      py={{
        xl: 40,
        base: 10,
      }}
    >
      <Stack
        justify="space-between"
        align="center"
        spacing={10}
        direction={{ xl: 'row', base: 'column' }}
      >
        <VStack
          spacing={4}
          align={{ xl: 'start', base: 'center' }}
          w={{ xl: '50%', base: '100%' }}
        >
          <Heading
            as="h1"
            fontSize={{
              xl: '6xl',
              base: '4xl',
            }}
            fontWeight="bold"
          >
            {title}
          </Heading>
          <Text
            fontSize={{
              base: 'xl',
              xl: '3xl',
            }}
            color="gray.600"
          >
            {description}
          </Text>
        </VStack>
        <Box
          position="relative"
          height={{
            base: '15em',
            xl: 'md',
          }}
          w={{
            base: '70%',
            xl: '50%',
          }}
        >
          <Image src={imageLink} layout="fill" alt="blog image" />
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default TopContent;
