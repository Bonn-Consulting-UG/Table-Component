import 'ka-table/style.css';
import './ColumnSettings.styles.css'
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';
import { ActionType, EditingMode, } from 'ka-table/enums';
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';
import { IHeadCellProps } from 'ka-table/props';
import { columns } from './settingColumns';

const styles = {
  expandButtonContainer: {
    display: 'flex',
    justifyContent: 'end',
    cursor: 'pointer'
  },
  expanded: {
    width: '14px',
    transform: 'translateY(3px)'
  },
  collapsed: {
    width: '14px',
    transform: 'rotate(180deg)'
  }
}

let showColumnSettings = true;

const ColumnSettings = ({ table }: any) => {
  const [data, setData] = useState<any[]>();

  const updateData = (action: any) => setData(table?.props?.columns?.map((c: any) => {
    if (c.key === action.rowKeyValue) {
      return ({ ...c, visible: action.value })
    }
    return ({ ...c, visible: c.visible !== false })
  }));

  const settingsTable = useTable({
    onDispatch: (action) => {
      if (action.type === ActionType.UpdateCellValue) {
        action.value ? table.showColumn(action.rowKeyValue) : table.hideColumn(action.rowKeyValue);
        updateData(action);
      }
      if (action.type === ActionType.ComponentDidMount) updateData(action);
    },
  });

  const HeadCell: React.FC<IHeadCellProps> = ({
    column: { title },
  }) => {
    return (
      <div style={styles.expandButtonContainer} onClick={() => {
          showColumnSettings = !showColumnSettings;
          // trigger change detection
          if (data) setData([...data]);
        }}>
        {showColumnSettings
        ? <div style={styles.expanded}>&#8963;</div>
        : <div style={styles.collapsed}>&#8963;</div>}
      </div>
    );
  };

  const childComponents = {
    rootDiv: { elementAttributes: () => ({ style: { width: 400, marginBottom: 20 } }) },
    headCell: {
      content: (props: any) => {
        if (props.column.key === 'expand'){
          return <HeadCell {...props}/>;
        }
      }
    },
    cell: {
      content: (props: any) => {
        switch (props.column.key) {
          case 'visible':
            return <CellEditorBoolean {...props} />;
        }
      },
    },
  }

  return (
    <div className={!showColumnSettings ? 'collapsed-settings' : ''}>
      <Table
        table={settingsTable}
        rowKeyField={'key'}
        data={data}
        columns={columns as any}
        editingMode={EditingMode.None}
        childComponents={childComponents}
      />
    </div>
  );
};


export default ColumnSettings