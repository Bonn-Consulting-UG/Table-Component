import 'ka-table/style.css';
import React from 'react';
import { Table, useTable } from 'ka-table';
import { EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { dataArray, defaultColumns } from './dummyData'
import ColumnSettings from './ColumnSettings';

type TableProps = {
  columns?: any,
  tabledata?: any,
  editrows?: any,
  paging?: any,
  settablecolumns?: any,
  groupedcolumns?: any,
  columnresizing?: any
  columnreordering?: any,
};


const BcgTable = (props: TableProps) => {
  const {
    columns = defaultColumns,
    tabledata = dataArray,
    editrows,
    paging,
    columnresizing,
    columnreordering,
    settablecolumns,
    groupedcolumns
  } = props

  const isRowEditable = editrows ? EditingMode.Cell : EditingMode.None

  const table = useTable();

  const pagingOptions = {
    enabled: paging,
    pageIndex: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15],
    position: PagingPosition.Bottom
  }

  const draggableHeader = (column: any) => {
    return (
      <>
        {(column.columnsKeys?.length > 0)
        ? null
        : <span style={{cursor: 'move'}}>&#8942; </span>}
        <span>{column.title}</span>
      </>
      );
  }

  return (
    <div>
      {settablecolumns && <ColumnSettings table={table} />}
      <Table
        table={table}
        columns={columns}
        groupedColumns={groupedcolumns}
        columnReordering={columnreordering}
        data={tabledata}
        editingMode={isRowEditable}
        rowKeyField={'id'}
        columnResizing={columnresizing}
        sortingMode={SortingMode.Single}
        paging={pagingOptions}
        childComponents={columnreordering ? {
          headCellContent: {
            content: ({column}) => draggableHeader(column)
          }
        } : undefined}
      />
    </div>
  );
};

export default BcgTable;