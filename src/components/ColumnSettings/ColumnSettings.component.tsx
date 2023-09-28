import 'ka-table/style.css';
import './ColumnSettings.styles.scss'
import React, { useState } from 'react';
import { Table, useTable } from 'ka-table';
import { ActionType, EditingMode, } from 'ka-table/enums';
import CellEditorBoolean from 'ka-table/Components/CellEditorBoolean/CellEditorBoolean';
import { columns } from './settingColumns';

const styles = {
  expanded: {
    width: '14px',
    transform: 'translateY(3px)'
  },
  collapsed: {
    width: '14px',
    transform: 'rotate(180deg)'
  }
}

let showColumnSettings = false;

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

  const switchVisibility = () => {
    showColumnSettings = !showColumnSettings;
    // trigger change detection
    if (data) setData([...data]);
  }

  const childComponents = {
    rootDiv: { elementAttributes: () => ({ style: { width: 400 } }) },
    cell: {
      content: (props: any) => {
        console.log(props)
        switch (props.column.key) {
          case 'visible':
            return <CellEditorBoolean {...props} />;
          case 'title':
            if (!props.value) return <i>No Title</i>
            break;
        }
      },
    },
  }

  return (
    <div className={'settings-table ' + (!showColumnSettings ? 'collapsed-settings' : '')}>
      <div className="settings-header" onClick={switchVisibility}>
        Column Visibility
        <div>
          {showColumnSettings
          ? <div style={styles.expanded}>&#8963;</div>
          : <div style={styles.collapsed}>&#8963;</div>}
        </div>
      </div>
      <div className="settings-table-wrapper">
        <Table
          table={settingsTable}
          rowKeyField={'key'}
          data={data}
          columns={columns as any}
          editingMode={EditingMode.None}
          childComponents={childComponents}
        />
      </div>
    </div>
  );
};


export default ColumnSettings