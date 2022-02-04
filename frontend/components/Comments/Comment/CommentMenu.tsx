import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaEllipsisH, FaFlag, FaTrash } from 'react-icons/fa';

interface CommentMenuProps {
  id: number;
  onDelete: (commentId: number) => void;
  isDeleting: boolean;
  isAuthor: boolean;
}

const CommentMenu = ({
  id,
  onDelete,
  isDeleting,
  isAuthor,
}: CommentMenuProps) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FaEllipsisH />} variant="ghost" />
      <MenuList>
        {isAuthor && (
          <MenuItem
            icon={<FaTrash />}
            disabled={isDeleting}
            onClick={() => onDelete(id)}
          >
            Delete
          </MenuItem>
        )}
        <MenuItem icon={<FaFlag />}>Report</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CommentMenu;
