
import { DataType } from 'ka-table/enums';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const defaultColumns = [
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Column 4', dataType: DataType.String },
]

const columns = [
  {
    key: 'title',
    isEditable: false,
    title: 'Field',
    dataType: DataType.String,
  },
  {
    key: 'visible',
    title: 'Visible',
    isEditable: false,
    style: { textAlign: 'center' },
    width: 80,
    dataType: DataType.Boolean,
  },
  {
    key: 'expand',
    title: '',
    isEditable: false,
    dataType: DataType.Boolean,
  }
]

export { defaultColumns, dataArray, columns };