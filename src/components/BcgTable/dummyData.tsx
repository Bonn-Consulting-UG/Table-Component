
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

const testSVG = `<svg class="icon--24" xmlns="http://www.w3.org/2000/svg" width=24 height=24 viewBox="0 0 24 24"><polygon points="12.9,6.5 11.1,6.5 11.1,11.1 6.5,11.1 6.5,12.9 11.1,12.9 11.1,17.5 12.9,17.5 12.9,12.9 17.5,12.9 17.5,11.1 
12.9,11.1 	"/><path d="M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-5,11-11S18,1,12,1z M12,21.5c-5.3,0-9.5-4.3-9.5-9.5S6.7,2.5,12,2.5
s9.5,4.3,9.5,9.5S17.3,21.5,12,21.5z"/></svg>`;

const defaultColumns: ColumnDefinition[] = [
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Column 4', dataType: DataType.Number },
  { key: 'column5', title: 'Column 5', dataType: CustomType.Checkbox, onValueChanged: dummyCallback.toString()},
  { key: 'column6', title: '', dataType: CustomType.Icon, icon: testSVG, onValueChanged: dummyCallback.toString(), cellStyle:{cursor: 'pointer', display:'flex', justifyContent:'center'}},
]

export { defaultColumns, dataArray };