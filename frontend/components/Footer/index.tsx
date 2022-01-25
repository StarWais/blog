import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="white"
      py={4}
      borderTopWidth="1px"
      borderTopColor="gray.200"
      mt={8}
      px={{
        base: 4,
        xl: 0,
      }}
    >
      <Flex align="center" justify="space-between" maxW="8xl" mx="auto">
        <Box>
          <b>hotcoffee</b> {new Date().getFullYear()} copyright all rights
          reserved
        </Box>
        <HStack as="nav" spacing={8}>
          <Link href="https://instagram.com/#" isExternal>
            <FaInstagram
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
            />
          </Link>
          <Link href="https://linkedin.com/#" isExternal>
            <FaLinkedin
              style={{
                height: '1.5rem',
                width: '1.5rem',
              }}
            />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
