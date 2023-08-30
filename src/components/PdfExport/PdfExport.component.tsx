import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { getValueByColumn } from "ka-table/Utils/DataUtils";
import React from "react";

const styles = {
  wrapper: {
    display: "inline-block",
    height: "2em"
  },
  exportButton: {
    border: "1px solid rgb(255, 90, 90)",
    borderRadius: "11px",
    paddingTop: "0.1em",
    paddingBottom: "0.1em",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    cursor: "pointer",
    color: "rgb(255, 90, 90)"
  }
}

const PdfExport = ({ table }: any) => {

    const exportClick = (orientation?: any) => {
        const doc: any = new jsPDF(orientation);
        const head = [table.props.columns.map((c: any) => c.title)];
        const body = table.props.data!.map((d: any) => table.props.columns.map((c: any)=> getValueByColumn(d, c)));
        autoTable(doc,{
          margin: 1,
          headStyles: { fillColor: '#F1F5F7', textColor: '#747D86' },
          alternateRowStyles: { fillColor: '#F9FBFC' },
          head: head as RowInput[],
          body: body as RowInput[],
        })
        doc.save('table.pdf')
    }
    
    return (<div style={styles.wrapper as any}>
        <span onClick={() => exportClick()} style={styles.exportButton}>&#8675; PDF</span>
      </div>)
}

export default PdfExport