import { Box, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import NextLink from '../NextLink';
import NavLink from './NavLink';
import Search from './Search';

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={{
        base: 4,
        xl: 0,
      }}
      maxW="8xl"
      mx="auto"
    >
      <NextLink href="/" fontSize="2xl" fontWeight="bold">
        HotCoffee
      </NextLink>
      <Search />
      <HStack as="nav" spacing={8}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/articles">Articles</NavLink>
      </HStack>
    </Flex>
  );
};

export default Header;
