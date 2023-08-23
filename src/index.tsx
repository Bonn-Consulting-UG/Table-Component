import './index.css';
// @ts-ignore
import BcgTable from './BcgTable.tsx';
import r2wc from '@r2wc/react-to-web-component';

const tableWebcomponent = r2wc(BcgTable, { props: {
  tabledata: "json",
  columns: "json",
  groupedcolumns: "json",
  editrows: "boolean",
  columnresizing: "boolean",
  columnreordering: "boolean",
  settablecolumns: "boolean",
  paging: "boolean",
  csvexport: "boolean",
  pdfexport: "boolean"
} });
customElements.define("bcg-table", tableWebcomponent);