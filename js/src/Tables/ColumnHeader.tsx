import * as React from "react";

interface IColumnHeaderProps {
  ColumnName: string;
  Heading: string;
  SortField: string;
  SortReverse: boolean;
  SortClick: (colName: string, reverse: boolean) => void;
}

const ColumnHeader: React.SFC<IColumnHeaderProps> = props => {
  var style = {
    cursor: "pointer"
  };
  return (
    <th
      onClick={e => {
        if (props.SortField == props.ColumnName) {
          props.SortClick(props.ColumnName, !props.SortReverse);
        } else {
          props.SortClick(props.ColumnName, false);
        }
      }}
      style={style}
    >
      {props.Heading}
    </th>
  );
};

export default ColumnHeader;
