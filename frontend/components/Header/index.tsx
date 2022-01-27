import { Box, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import NextLink from '../NextLink';
import HeaderAuth from './HeaderAuth';
import NavLink from './NavLink';
import Search from './Search';

const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      bg="white"
      left={0}
      zIndex={1}
      py={4}
      px={{
        base: 4,
        xl: 0,
      }}
    >
      <Flex align="center" justify="space-between" maxW="8xl" mx="auto">
        <NextLink href="/" fontSize="2xl" fontWeight="bold">
          HotCoffee
        </NextLink>
        <Search />
        <HStack as="nav" spacing={8}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/articles">Articles</NavLink>
          <HeaderAuth />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
