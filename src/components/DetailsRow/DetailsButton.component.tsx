import { hideDetailsRow, showDetailsRow } from "ka-table/actionCreators";
import React from "react";

const styles = {
  expanded: {
    width: '14px',
    transform: 'translateY(3px)'
  },
  collapsed: {
    width: '14px',
    transform: 'rotate(180deg)'
  },
  indicator: {
    backgroundColor: '#4f4f4f',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: '14px',
    width: '14px',
    fontSize: '10px'
  }
}

export const DetailsButton: React.FC<any> = ({
  dispatch,
  rowKeyValue,
  isDetailsRowShown,
  rowData,
  detailrowoptions
}) => {
  const detailData = rowData[detailrowoptions?.columnKey];
  if (!detailData || detailData.length < 1) return <></>
  return (
    <div style={{cursor: 'pointer', display: 'flex'}} onClick={() => {
      dispatch(isDetailsRowShown ? hideDetailsRow(rowKeyValue) : showDetailsRow(rowKeyValue));
    }}>
      {isDetailsRowShown
      ? <div style={styles.expanded}>&#8963;</div>
      : <div style={styles.collapsed}>&#8963;</div>}
      <div style={styles.indicator}>{detailData.length}</div>
    </div>
  );
};