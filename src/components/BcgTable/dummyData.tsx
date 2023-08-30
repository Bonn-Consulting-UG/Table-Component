
import { DataType } from 'ka-table/enums';
import { ColumnDefinition } from '../../model/ColumnDefinition';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: index,
    id: index,
  }));

/**
 * Todo: 
 * ‘boolean’, ‘date’, ‘number’, ‘object’, ‘string’, 'checkbox' ...
 */
const defaultColumns: ColumnDefinition[] = [
  { key: 'column1', title: 'Column 1', dataType: DataType.String },
  { key: 'column2', title: 'Column 2', dataType: DataType.String },
  { key: 'column3', title: 'Column 3', dataType: DataType.String },
  { key: 'column4', title: 'Number Column', dataType: DataType.Number },
]

export { defaultColumns, dataArray };