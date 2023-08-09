import 'ka-table/style.css';
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';
import { DataType, ActionType, EditingMode, SortingMode, PagingPosition } from 'ka-table/enums';
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';
import { IHeadCellProps } from 'ka-table/props';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const defaultColumns = [
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Column 4', dataType: DataType.String },
]

let showColumnSettings = true;

const ColumnSettings = ({ table }) => {
  const [data, setData] = useState<any[]>();
  const updateData = (action: any) => {
    setData(table?.props?.columns?.map((c) => {
      if (c.key === action.rowKeyValue) {
        return ({ ...c, visible: action.value })
      }
      return ({ ...c, visible: c.visible !== false })
      }))
    };
  const settingsTable = useTable({
    onDispatch: (action) => {
      if (action.type === ActionType.UpdateCellValue) {
        action.value ? table.showColumn(action.rowKeyValue) : table.hideColumn(action.rowKeyValue);
        updateData(action);
      }
      if (action.type === ActionType.ComponentDidMount) {
        updateData(action);
      }
    },
  });

  const HeadCell: React.FC<IHeadCellProps> = ({
    column: { title },
  }) => {
    return (
      <div style={{float: 'right', cursor: 'pointer'}} onClick={() => {
          showColumnSettings = !showColumnSettings;
          // trigger change detection
          if (data) setData([...data]);
        }}>
        {showColumnSettings
        ? <div style={{ width: '14px', transform: 'translateY(3px)'}}>&#8963;</div>
        : <div style={{width: '14px', transform: 'rotate(180deg)'}}>&#8963;</div>}
      </div>
    );
  };
  
  return (
    <Table
      table={settingsTable}
      rowKeyField={'key'}
      data={showColumnSettings ? data : []}
      columns={[
        {
          key: 'title',
          isEditable: false,
          title: 'Field',
          dataType: DataType.String,
        },
        {
          key: 'visible',
          title: 'Visible',
          isEditable: false,
          style: { textAlign: 'center' },
          width: 80,
          dataType: DataType.Boolean,
        },
        {
          key: 'expand',
          title: '',
          isEditable: false,
          dataType: DataType.Boolean,
        }
      ]}
      editingMode={EditingMode.None}
      childComponents={{
        rootDiv: { elementAttributes: () => ({ style: { width: 400, marginBottom: 20 } }) },
        headCell: {
          content: (props) => {
            if (props.column.key === 'expand'){
              return <HeadCell {...props}/>;
            }
          }
        },
        cell: {
          content: (props) => {
            switch (props.column.key) {
              case 'visible':
                return <CellEditorBoolean {...props} />;
            }
          },
        },
      }}
    />
  );
};

const BcgTable = (props) => {
  const table = useTable();
  return (
    <div>
      {props.settablecolumns && <ColumnSettings table={table} />}
      <Table
        table={table}
        columns={props.columns ?? defaultColumns}
        groupedColumns={props.groupedcolumns}
        data={props.tabledata?.data ?? dataArray}
        editingMode={props.editrows ? EditingMode.Cell : EditingMode.None}
        rowKeyField={'id'}
        columnResizing={true}
        sortingMode={SortingMode.Single}
        paging= {{
          enabled: props.paging,
          pageIndex: 0,
          pageSize: 10,
          pageSizes: [5, 10, 15],
          position: PagingPosition.Bottom
        }}
      />
    </div>
  );
};

export default BcgTable;