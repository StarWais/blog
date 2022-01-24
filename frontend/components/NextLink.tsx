import React, { FC } from 'react';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import Link from 'next/link';

interface NextLinkProps extends ChakraLinkProps {
  href: string;
}

const NextLink: FC<NextLinkProps> = ({ href, children, ...rest }) => (
  <Link passHref href={href}>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </Link>
);

export default NextLink;
