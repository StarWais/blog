import { FC } from 'react';
import { useRouter } from 'next/router';

import NextLink from '../NextLink';

const NavLink: FC<{ href: string }> = ({ href, children }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  const linkProps = {
    color: isActive ? 'blue.500' : 'black',
    fontWeight: isActive ? 'bold' : 'normal',
  };
  return (
    <NextLink href={href} {...linkProps}>
      {children}
    </NextLink>
  );
};

export default NavLink;
