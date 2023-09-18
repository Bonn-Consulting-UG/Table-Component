import 'ka-table/style.css';
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';
import { EditingMode, SortingMode, PagingPosition, ActionType } from 'ka-table/enums';
import { dataArray, defaultColumns } from './dummyData'
import ColumnSettings from '../ColumnSettings/ColumnSettings.component';
import PdfExport from '../PdfExport/PdfExport.component';
import CsvExport from '../CsvExport/CsvExport.component';
import { filterData } from '../ExtendedFilters/filterData';
import { ColumnDefinition } from '../../model/ColumnDefinition';
import ExtendedFilters from '../ExtendedFilters/ExtendedFilters.component';
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';
import { CustomType } from '../../model/CustomType';
import { Column } from 'ka-table/models';

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
  const [currentData, setCurrentData] = useState(tabledata);

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

  const checkboxClicked = (action: any) => {
    if (action.type !== ActionType.UpdateCellValue) return;

    tabledata.map((row:any, index:number) => {
      if(index === action.rowKeyValue) {
        row[action.columnKey] = action.value;
      }
    })
    const col = columns.find(col => col.key === action.columnKey);
    if (col?.onValueChanged) {
      col.onValueChanged(action);
    }
    setCurrentData([...tabledata])
  }

  const childComponents = {
    cell: {
      content: (props: any) => {
        switch (props.column.dataType) {
          case CustomType.Checkbox:
            return <CellEditorBoolean {...{...props, dispatch: checkboxClicked}} />;
        }
      },
    }
  }

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
        columns={columns as Column[]}
        groupedColumns={groupedcolumns}
        columnReordering={columnreordering}
        data={currentData}
        editingMode={isRowEditable}
        rowKeyField={'id'}
        columnResizing={columnresizing}
        sortingMode={SortingMode.Single}
        paging={pagingOptions}
        extendedFilter={(data) => filterData(data, filterValue)}
        childComponents={columnreordering ? {
          headCellContent: {
            content: ({column}) => draggableHeader(column)
          },
          ...childComponents
        } : childComponents}
      />
    </div>
  );
};

export default BcgTable;