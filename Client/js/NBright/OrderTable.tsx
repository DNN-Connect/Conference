import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";
import OrderTableRow from "./OrderTableRow";
import AddAuditText from "./AddAuditText";
import ShowDetails from "./ShowDetails";
import { sort_by } from "../Common";
import ColumnHeader from "../Tables/ColumnHeader";
import { INBrightOrder } from "../Models/";

interface IOrderTableProps {
  module: Models.IAppModule;
  conferenceId: number;
  orders: Models.INBrightOrder[];
}

interface IOrderTableState {
  orders: Models.INBrightOrder[];
  sortField: string;
  sortReverse: boolean;
}

export default class OrderTable extends React.Component<
  IOrderTableProps,
  IOrderTableState
> {
  refs: {
    ShowDetails: ShowDetails;
    AuditText: AddAuditText;
  };

  constructor(props: IOrderTableProps) {
    super(props);
    this.state = {
      orders: props.orders,
      sortField: "OrderNr",
      sortReverse: false
    };
  }

  sort(sortField: string, sortReverse: boolean) {
    this.setState({
      sortField: sortField,
      sortReverse: sortReverse
    });
  }

  changeStatus(
    order: Models.INBrightOrder,
    newStatus: Models.ISwitchButtonOption
  ) {
    this.props.module.service.updateOrderStatus(
      order.ItemId,
      newStatus.Id,
      (data: Models.INBrightOrder) => {
        var orders = this.state.orders.map(o => {
          if (o.ItemId == order.ItemId) {
            return data;
          } else {
            return o;
          }
        });
        this.setState({
          orders: orders
        });
      }
    );
  }

  addAuditClick(itemId: number) {
    this.refs.AuditText.show(itemId);
  }

  addAuditText(itemId: number, auditText: string) {
    this.props.module.service.addOrderAudit(itemId, auditText, () => {});
  }

  showDetailsClick(itemId: number) {
    this.refs.ShowDetails.show(itemId);
  }

  render() {
    var statusOptions: Models.ISwitchButtonOption[] = [
      { Id: 10, ClassName: "#bbb", Text: "Incomplete" },
      { Id: 20, ClassName: "#2d3538", Text: "Waiting for Bank" },
      { Id: 30, ClassName: "#bbb", Text: "Cancelled" },
      { Id: 40, ClassName: "#acc413", Text: "Payment OK" },
      { Id: 50, ClassName: "#c93200", Text: "Payment Not Verified" },
      { Id: 60, ClassName: "#ea690b", Text: "Waiting for Payment" },
      { Id: 70, ClassName: "#eb2659", Text: "Waiting for Stock" },
      { Id: 80, ClassName: "#eb2659", Text: "Waiting" },
      { Id: 90, ClassName: "#893658", Text: "Shipped" },
      { Id: 100, ClassName: "#1aa8e3", Text: "Completed" },
      { Id: 110, ClassName: "#bbb", Text: "Archived" },
      { Id: 120, ClassName: "#eb2659", Text: "Being Manufactured" }
    ];
    var orders = this.state.orders;
    var sortPrimer: Function | null = null;
    switch (this.state.sortField) {
      case "CreatedDate":
        sortPrimer = function(a) {
          return moment(a).format();
        };
        break;
      case "OrderStatus":
        sortPrimer = parseInt;
        break;
      case "OrderedBy":
        sortPrimer = function(a) {
          return a.toUpperCase();
        };
        break;
    }
    orders.sort((a, b) =>
      sort_by<INBrightOrder>(
        this.state.sortField,
        this.state.sortReverse,
        sortPrimer
      )(a, b)
    );
    var rows = orders.map(o => {
      return (
        <OrderTableRow
          key={o.ItemId}
          order={o}
          statusOptions={statusOptions}
          statusChange={(o, s) => this.changeStatus(o, s)}
          addAuditClick={id => this.addAuditClick(id)}
          showDetailsClick={id => this.showDetailsClick(id)}
        />
      );
    });
    return (
      <div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <ColumnHeader
                SortField={this.state.sortField}
                SortReverse={this.state.sortReverse}
                Heading="Date"
                ColumnName="CreatedDate"
                SortClick={this.sort}
              />
              <ColumnHeader
                SortField={this.state.sortField}
                SortReverse={this.state.sortReverse}
                Heading="Nr"
                ColumnName="OrderNr"
                SortClick={this.sort}
              />
              <ColumnHeader
                SortField={this.state.sortField}
                SortReverse={this.state.sortReverse}
                Heading="By"
                ColumnName="OrderedBy"
                SortClick={this.sort}
              />
              <th>Total</th>
              <th>Nr</th>
              <ColumnHeader
                SortField={this.state.sortField}
                SortReverse={this.state.sortReverse}
                Heading="Status"
                ColumnName="OrderStatus"
                SortClick={this.sort}
              />
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <AddAuditText
          module={this.props.module}
          ref="AuditText"
          save={(id, txt) => this.addAuditText(id, txt)}
        />
        <ShowDetails
          ref="ShowDetails"
          module={this.props.module}
          conferenceId={this.props.conferenceId}
        />
      </div>
    );
  }
}
