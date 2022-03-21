import {
  Tbody,
  Th,
  Thead,
  Tr,
  Table as ChakraTable,
  Td,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import _ from 'lodash';
import { TableOptions, useTable } from 'react-table';

export interface ReactTableOptions extends TableOptions<{}> {
  fetchMore?: () => void;
  hasMore?: boolean;
  isFetching?: boolean;
  columns: any[];
}

const ReactTable = (options: ReactTableOptions) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options);
  if (_.isEmpty(rows)) {
    return (
      <Text textAlign="center" fontSize="lg">
        No data availiable
      </Text>
    );
  }
  return (
    <>
      <ChakraTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
      {options.hasMore && (
        <Box mx="auto" maxW="fit-content">
          <Button
            isLoading={options.isFetching}
            onClick={options.fetchMore}
            loadingText="Loading"
            colorScheme="purple"
            my={6}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default ReactTable;
