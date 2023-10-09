
import { DataType } from 'ka-table/enums';
import { ColumnDefinition } from '../../model/ColumnDefinition';
import { CustomType } from '../../model/CustomType';

const dummyCallback = (action: any) => {
  console.log('Dummy Callback called! Value: ', action);
}

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: index,
    column5: false,
    id: index,
  }));

const testSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="rgb(75, 75, 75)" height="24" viewBox="0 -960 960 960" width="24">
<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
</svg>`;

const defaultColumns: ColumnDefinition[] = [
  { key: 'column0', title: '', width: 70, dataType: CustomType.Icon, icon: testSVG, onValueChanged: dummyCallback.toString(), cellStyle:{cursor: 'pointer', display:'flex', justifyContent:'center'}},
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Column 4', dataType: DataType.Number },
  { key: 'column5', title: 'Column 5', dataType: CustomType.Checkbox, onValueChanged: dummyCallback.toString()},
]

export { defaultColumns, dataArray };