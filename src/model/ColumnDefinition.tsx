import { DataType } from "ka-table/enums";
import { CustomType } from "./CustomType";

export interface ColumnDefinition {
    key: string;
    title: string;
    dataType: DataType | CustomType;
    cellStyle?: React.CSSProperties;
    // callback function as string because it must be passed as json
    onValueChanged?: string;
    icon?: any;
    width?: number | string;
}