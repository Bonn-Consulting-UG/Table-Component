import 'ka-table/style.css';
import React from 'react';
import { Table, useTable } from 'ka-table';
import { EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { dataArray, defaultColumns } from './dummyData'
import ColumnSettings from './ColumnSettings';
import { CSVLink } from 'react-csv';

type TableProps = {
  columns?: any,
  tabledata?: any,
  editrows?: any,
  paging?: any,
  settablecolumns?: any,
  groupedcolumns?: any,
  columnresizing?: any
  columnreordering?: any,
  csvexport?: any
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
    groupedcolumns,
    csvexport
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
        {(!column.columnsKeys) && <span style={{cursor: 'move'}}>&#8942; </span>}
        <span>{column.title}</span>
      </>
      );
  }

  return (
    <div>
      {settablecolumns && 
      <ColumnSettings table={table} />}

      {csvexport && 
      <div style={{ height: '2em' }}>
        <CSVLink
          style={{ float: "right", textDecoration: "none" }}
          data={tabledata}
          headers={columns.map((c: any) => ({ label: c.title!, key: c.key! }))}
          filename='bcg-table.data.csv'
          enclosingCharacter={''}
          separator={';'}>
          <span style={{
            border: "1px solid black",
            borderRadius: "15px",
            paddingTop: "0.1em",
            paddingBottom: "0.1em",
            paddingLeft: "0.5em",
            paddingRight: "0.5em",
            color: "black"
            }}>&#8675; csv</span>
        </CSVLink>
      </div>}

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