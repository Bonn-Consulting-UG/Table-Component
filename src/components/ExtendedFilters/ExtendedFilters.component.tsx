import React from "react";
import './ExtendedFilters.styles.scss';
import FilterControl from "react-filter-control";
import { IFilterControlFilterValue } from 'react-filter-control/interfaces';
import { DataType } from "ka-table";
import { ColumnDefinition } from "../../model/ColumnDefinition";
import { FilterOperators } from "../../model/FilterOperators";
import { CustomType } from "../../model/CustomType";
import { groups } from "../../model/FilterGroups";

const ExtendedFilters = (props: {columns: ColumnDefinition[], filterValue: any, changeFilter: any}) => {

  const getOperators = (dataType: DataType | CustomType) => {
    switch(dataType) {
      case DataType.String: 
        return [ FilterOperators.Contains, FilterOperators.DoesNotContain, FilterOperators.BeginsWith, FilterOperators.EndsWith ]
      case DataType.Number:
        return [ FilterOperators.Equals, FilterOperators.IsNotEqual, FilterOperators.MoreThan, FilterOperators.LessThan]
      default:
        return [FilterOperators.Equals]
    }
  }

  const fields = props.columns.map((col: ColumnDefinition) => {
    return {
      caption: col.title,
      name: col.key,
      operators: getOperators(col.dataType)
    }
  })
  
  const onFilterChanged = (newFilterValue: IFilterControlFilterValue) => {
    props.changeFilter(newFilterValue);
  };

  return (
    <div className="filterContainer">
      <FilterControl {...{ fields, groups, filterValue: props.filterValue, onFilterValueChanged: onFilterChanged }} />
    </div>
  )
}

export default ExtendedFilters