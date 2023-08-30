
import { DataType } from 'ka-table/enums';

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

export { columns };