import * as React from "react";
import * as moment from "moment";
import * as Models from "../Models/";
import { colStyle } from "../Common";

interface IParticipantRowProps {
  module: Models.IAppModule;
  participant: any;
  toggleParticipantRegistration: (p: any) => void;
}

const ParticipantRow: React.SFC<IParticipantRowProps> = props => {
  var btn: JSX.Element | null = null;
  if (
    (props.participant.ProductName as string).substring(0, 8) == "Attendee" &&
    (props.participant.OrderStatus == 40 ||
      props.participant.OrderStatus == 100)
  ) {
    if (props.participant.AttendeeUserId) {
      btn = (
        <button
          className="btn btn-sm btn-warning"
          onClick={e => {
            e.preventDefault();
            props.toggleParticipantRegistration(props.participant);
          }}
        >
          <i className="glyphicon glyphicon-minus" />
        </button>
      );
    } else {
      btn = (
        <button
          className="btn btn-sm btn-success"
          onClick={e => {
            e.preventDefault();
            props.toggleParticipantRegistration(props.participant);
          }}
        >
          <i className="glyphicon glyphicon-plus" />
        </button>
      );
    }
  }
  return (
    <tbody>
      <tr>
        <td style={colStyle(50)}>{props.participant.ProductName}</td>
        <td>{props.participant.FirstName}</td>
        <td>{props.participant.LastName}</td>
        <td>{props.participant.Email}</td>
        <td style={colStyle(32)} rowSpan={2}>
          {btn}
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <em>
            Staying from {moment(props.participant.Arrival).format("l")} to{" "}
            {moment(props.participant.Departure).format("l")}
          </em>
        </td>
      </tr>
    </tbody>
  );
};

export default ParticipantRow;
