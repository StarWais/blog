import {
  Avatar,
  Box,
  HStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import NextLink from '../NextLink';
import { useAppDispatch } from '../../hooks';
import { logOut } from '../../redux/auth/auth.slice';
import { Role, User } from '../../types/User.d';
import { getUploadUrl } from '../../utils/helpers';

const UserProfile = ({ name, role, picture }: User) => {
  const dispatch = useAppDispatch();
  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Avatar name={name} size="sm" src={getUploadUrl(picture)} />
          <Box fontSize="sm" fontWeight="bold">
            {name}
          </Box>
        </HStack>
      </MenuButton>

      <MenuList>
        {role === Role.ADMIN && (
          <MenuItem>
            <NextLink href="/admin">Admin panel</NextLink>
          </MenuItem>
        )}
        <MenuItem>
          <NextLink href="/settings">Settings</NextLink>
        </MenuItem>
        <MenuDivider />
        <MenuItem fontWeight="semibold" onClick={() => dispatch(logOut())}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserProfile;
