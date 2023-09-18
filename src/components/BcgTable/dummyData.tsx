
import { DataType } from 'ka-table/enums';
import { ColumnDefinition } from '../../model/ColumnDefinition';
import { CustomType } from '../../model/CustomType';

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

const dummyCallback = (action: any) => {
  console.log('Dummy Callback called! Value: ', action);
}

const defaultColumns: ColumnDefinition[] = [
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Column 4', dataType: DataType.Number },
  { key: 'column5', title: 'Column 5', dataType: CustomType.Checkbox, onValueChanged: dummyCallback}
]

export { defaultColumns, dataArray };