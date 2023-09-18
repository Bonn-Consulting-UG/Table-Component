import { DataType } from "ka-table/enums";
import { CustomType } from "./CustomType";

export interface ColumnDefinition {
    key: string;
    title: string;
    dataType: DataType | CustomType;
    style?: React.CSSProperties;
    onValueChanged?: (action: any) => void;
}