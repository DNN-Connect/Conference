import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";
import ParticipantRow from "./ParticipantRow";
import { colStyle } from "../Common";

interface IShowDetailsProps {
  module: Models.IAppModule;
  conferenceId: number;
}

interface IShowDetailsState {
  ItemId: number;
  Details: Models.INBrightOrderItem[];
  Log: Models.INBrightAudit[];
  FirstRec: Models.INBrightOrderItem;
}

export default class ShowDetails extends React.Component<
  IShowDetailsProps,
  IShowDetailsState
> {
  refs: {
    popup: any;
  };

  constructor(props: IShowDetailsProps) {
    super(props);
    this.state = {
      ItemId: -1,
      Details: [],
      Log: [],
      FirstRec: new Models.NBrightOrderItem()
    };
  }

  statusToText(status: number): string {
    switch (status) {
      case 10:
        return "Incomplete 010";
      case 20:
        return "Waiting for Bank 020";
      case 30:
        return "Cancelled 030";
      case 40:
        return "Payment OK 040";
      case 50:
        return "Payment Not Verified 050";
      case 60:
        return "Waiting for Payment 060";
      case 70:
        return "Waiting for Stock 070";
      case 80:
        return "Waiting 080";
      case 90:
        return "Shipped 090";
      case 100:
        return "Completed 100";
      case 110:
        return "Archived 110";
      case 120:
        return "Being Manufactured 120";
      default:
        return "";
    }
  }

  nullOrMoney(amount: number): string {
    if (amount) {
      return amount.toFixed(2);
    }
    return "";
  }

  show(itemId: number): void {
    this.setState(
      {
        ItemId: itemId
      },
      () => {
        this.props.module.service.getOrderAudit(
          this.props.conferenceId,
          itemId,
          data => {
            this.setState(
              {
                Log: data
              },
              () => {
                this.props.module.service.getOrderDetails(
                  this.props.conferenceId,
                  itemId,
                  data => {
                    if (data.length > 0) {
                      this.setState({
                        FirstRec: data[0]
                      });
                    }
                    this.setState(
                      {
                        Details: data
                      },
                      () => {
                        ($(this.refs.popup) as any).modal("show");
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  toggleParticipantRegistration(person: Models.INBrightOrderItem) {
    this.props.module.service.toggleParticipant(
      this.props.conferenceId,
      this.state.ItemId,
      person,
      (data: Models.INBrightOrderItem[]) => {
        this.setState({
          Details: data
        });
      }
    );
  }

  render() {
    var rows = this.state.Details.map(person => {
      return (
        <ParticipantRow
          module={this.props.module}
          participant={person}
          toggleParticipantRegistration={e => {
            e.preventDefault();
            this.toggleParticipantRegistration;
          }}
        />
      );
    });
    var auditRows = this.state.Log.map(item => {
      var msg = item.Message;
      if (!msg && item.OrderStatus) {
        msg = "Status: " + this.statusToText(item.OrderStatus);
      }
      return (
        <tr>
          <td style={colStyle(50)}>{moment(item.AuditDate).format("l")}</td>
          <td style={colStyle(75)}>{item.Username}</td>
          <td>{msg}</td>
        </tr>
      );
    });
    return (
      <div className="modal fade" role="dialog" ref="popup">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Details</h4>
            </div>
            <div className="modal-body">
              <dl className="dl-horizontal">
                <dt>Order Nr</dt>
                <dd>{this.state.FirstRec.OrderNr}</dd>
                <dt>Order Date and Time</dt>
                <dd>{moment(this.state.FirstRec.CreatedDate).format("LLL")}</dd>
                <dt>Ordered By</dt>
                <dd>{this.state.FirstRec.OrderedBy}</dd>
                <dt>Status</dt>
                <dd>{this.statusToText(this.state.FirstRec.OrderStatus)}</dd>
                <dt>Subtotal</dt>
                <dd>{this.nullOrMoney(this.state.FirstRec.SubTotal)}</dd>
                <dt>Discount</dt>
                <dd>{this.nullOrMoney(this.state.FirstRec.Discount)}</dd>
                <dt>Total</dt>
                <dd>{this.nullOrMoney(this.state.FirstRec.Total)}</dd>
              </dl>
              <h4>Participants</h4>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th />
                  </tr>
                </thead>
                {rows}
              </table>
              <h4>Audit</h4>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>{auditRows}</tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
