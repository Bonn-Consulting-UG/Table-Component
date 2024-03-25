import './index.css';
// @ts-ignore
import BcgTable from './components/BcgTable/BcgTable.component';
import r2wc from '@r2wc/react-to-web-component';

const tableWebcomponent = r2wc(BcgTable, { props: {
  tabledata: "json",
  columns: "json",
  groupedcolumns: "json",
  detailrowoptions: "json",
  editrows: "boolean",
  columnresizing: "boolean",
  columnreordering: "boolean",
  settablecolumns: "boolean",
  paging: "boolean",
  csvexport: "boolean",
  pdfexport: "boolean",
  grouping: "boolean",
  extendedfilters: "boolean"
} });

if (!customElements.get("bcg-table")) customElements.define("bcg-table", tableWebcomponent);