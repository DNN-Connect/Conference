import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";
import StatusButton from "./StatusButton";
import { colStyle } from "../Common";

interface IOrderTableRowProps {
  order: Models.INBrightOrder;
  addAuditClick: (id: number) => void;
  showDetailsClick: (id: number) => void;
  statusChange: (order: Models.INBrightOrder, newStatus: Models.ISwitchButtonOption) => void;
  statusOptions: Models.ISwitchButtonOption[];
}

const OrderTableRow: React.SFC<IOrderTableRowProps> = props => {
  return (
    <tr>
      <td style={colStyle(75)}>
        {moment(props.order.CreatedDate).format("l")}
      </td>
      <td style={colStyle(150)}>{props.order.OrderNr}</td>
      <td>{props.order.OrderedBy}</td>
      <td style={colStyle(50, true)}>{props.order.Total.toFixed(2)}</td>
      <td style={colStyle(20, true)}>{props.order.NrParticipants}</td>
      <td style={colStyle(200)}>
        <StatusButton
          options={props.statusOptions}
          onStatusChange={newStatus =>
            props.statusChange(props.order, newStatus)
          }
          selected={props.order.OrderStatus}
        />
      </td>
      <td style={colStyle(32)}>
        <button
          className="btn btn-default"
          onClick={e => {
            e.preventDefault();
            props.addAuditClick(props.order.ItemId);
          }}
        >
          <i className="glyphicon glyphicon-plus" />
        </button>
      </td>
      <td style={colStyle(32)}>
        <button
          className="btn btn-default"
          onClick={e => {
            e.preventDefault();
            props.showDetailsClick(props.order.ItemId);
          }}
        >
          <i className="glyphicon glyphicon-user" />
        </button>
      </td>
    </tr>
  );
};

export default OrderTableRow;
