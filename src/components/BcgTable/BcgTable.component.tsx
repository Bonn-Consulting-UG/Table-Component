import './BcgTable.style.scss'
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
import DOMPurify from 'dompurify';

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
  const [visibleColumns, setVisibleColumns] = useState(columns);

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
    triggerColumnCallback(action.columnKey, action)
    setCurrentData([...tabledata])
  }

  const triggerColumnCallback = (colKey: string, action: any) => {
    const col = columns.find(col => col.key === colKey);
    if (!col?.onValueChanged) return
    // eslint-disable-next-line no-eval
    const callback = eval(col.onValueChanged);
    callback(action);
  }

  const childComponents = {
    cell: {
      content: (props: any) => {
        switch (props.column.dataType) {
          case CustomType.Checkbox:
            return <CellEditorBoolean {...{...props, dispatch: checkboxClicked}} />;
          case CustomType.Icon:
            return <div
            style={props.column.cellStyle}
            onClick={() => triggerColumnCallback(props.column.key, props)}
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.column.icon)}}>
            </div>
        }
      },
    }
  }

  return (
    <div className="table-wrapper">
      {settablecolumns && <ColumnSettings table={table} visibleColumnCallback={setVisibleColumns}/>}

      {extendedfilters && <ExtendedFilters {...{columns: [...columns].filter(col => !!col.key), filterValue, changeFilter}}></ExtendedFilters>}
      
      <div style={styles.exportRow}>
        {csvexport && <CsvExport tabledata={currentData} visibleColumns={visibleColumns} filterValue={filterValue}/>}
        {pdfexport && <PdfExport table={table} visibleColumns={visibleColumns} filterValue={filterValue}/>}
      </div>

      <div className="settings-separator"></div>

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