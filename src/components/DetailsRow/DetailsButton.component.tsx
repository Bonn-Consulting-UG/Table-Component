import { hideDetailsRow, showDetailsRow } from "ka-table/actionCreators";
import { ICellTextProps } from "ka-table/props";
import React from "react";

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

export const DetailsButton: React.FC<ICellTextProps> = ({
  dispatch,
  rowKeyValue,
  isDetailsRowShown,
}) => {
  return (
    <div style={{cursor: 'pointer'}} onClick={() => {
      dispatch(isDetailsRowShown ? hideDetailsRow(rowKeyValue) : showDetailsRow(rowKeyValue));
    }}>
      {isDetailsRowShown
      ? <div style={styles.expanded}>&#8963;</div>
      : <div style={styles.collapsed}>&#8963;</div>}
    </div>
  );
};