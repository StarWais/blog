import React, { FC } from 'react';
import {
  LinkOverlay as ChakraLink,
  LinkOverlayProps as ChakraLinkProps,
} from '@chakra-ui/react';
import Link from 'next/link';

interface NextOverlayLinkProps extends ChakraLinkProps {
  href: string;
}

const NextOverlayLink: FC<NextOverlayLinkProps> = ({
  href,
  children,
  ...rest
}) => (
  <Link passHref href={href}>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </Link>
);

export default NextOverlayLink;
