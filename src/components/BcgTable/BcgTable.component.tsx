import 'ka-table/style.css';
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';
import { EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import { dataArray, defaultColumns } from './dummyData'
import ColumnSettings from '../ColumnSettings/ColumnSettings.component';
import PdfExport from '../PdfExport/PdfExport.component';
import CsvExport from '../CsvExport/CsvExport.component';
import { filterData } from '../ExtendedFilters/filterData';
import { ColumnDefinition } from '../../model/ColumnDefinition';
import ExtendedFilters from '../ExtendedFilters/ExtendedFilters.component';

type TableProps = {
  columns?: ColumnDefinition[],
  tabledata?: any,
  groupedcolumns?: any,
  editrows?: boolean,
  paging?: boolean,
  settablecolumns?: boolean,
  columnresizing?: boolean
  columnreordering?: boolean,
  csvexport?: boolean,
  pdfexport?: boolean,
  extendedfilters?: boolean
};

const styles = {
  exportRow: {
    height: "2em",
    width: "100%",
    display: "flex",
    justifyContent: "end"
  },
  draggable: {
    cursor: "move"
  }
}

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
    csvexport,
    pdfexport,
    extendedfilters
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
        {(!column.columnsKeys) && <span style={styles.draggable}>&#8942; </span>}
        <span>{column.title}</span>
      </>
      );
  }

  const [filterValue, changeFilter] = useState({groupName: 'and', items: []});

  return (
    <div>
      {settablecolumns && <ColumnSettings table={table} />}

      {extendedfilters && <ExtendedFilters {...{columns, filterValue, changeFilter}}></ExtendedFilters>}
      
      <div style={styles.exportRow}>
        {csvexport && <CsvExport tabledata={tabledata} columns={columns}/>}
        {pdfexport && <PdfExport table={table}/>}
      </div>

      <Table
        table={table}
        columns={columns as any}
        groupedColumns={groupedcolumns}
        columnReordering={columnreordering}
        data={tabledata}
        editingMode={isRowEditable}
        rowKeyField={'id'}
        columnResizing={columnresizing}
        sortingMode={SortingMode.Single}
        paging={pagingOptions}
        extendedFilter={(data) => filterData(data, filterValue)}
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