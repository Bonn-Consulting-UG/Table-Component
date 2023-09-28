
import { DataType } from 'ka-table/enums';
import { Column } from 'ka-table/models';

const columns: Column[] = [
  {
    key: 'title',
    isEditable: false,
    title: '',
    dataType: DataType.String,
  },
  {
    key: 'visible',
    title: '',
    isEditable: false,
    style: { textAlign: 'center' },
    width: 80,
    dataType: DataType.Boolean,
  }
]

export { columns };