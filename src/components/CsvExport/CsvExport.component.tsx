import React from "react";
import { CSVLink } from 'react-csv';
import { filterData } from "../ExtendedFilters/filterData";

const styles = {
  wrapper: {
    display: "inline-block",
    height: "2em",
    marginRight: "0.5em"
  },
  link: {
    textDecoration: "none"
  },
  exportButton: {
    border: "1px solid rgb(40, 190, 40)",
    borderRadius: "11px",
    paddingTop: "0.1em",
    paddingBottom: "0.1em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    color: "rgb(40, 200, 40)"
  }
}

const CsvExport = ({ tabledata, visibleColumns, filterValue }: any) => {
    return (
    <div style={styles.wrapper}>
      <CSVLink
        style={styles.link}
        data={filterData(tabledata, filterValue)}
        headers={visibleColumns.map((c: any) => ({ label: c.title!, key: c.key! }))}
        filename='bcg-table.data.csv'
        enclosingCharacter={''}
        separator={';'}>
        <span style={styles.exportButton}>&#8675; CSV</span>
      </CSVLink>
    </div>)
}

export default CsvExport