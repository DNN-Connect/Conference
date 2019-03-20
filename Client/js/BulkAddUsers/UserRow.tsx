import * as React from "react";
import * as Models from "../Models/";

interface UserRowProps {
  user: Models.IAttendee;
}

const UserRow: React.SFC<UserRowProps> = props => {
  return (
    <tr>
      <td>{props.user.Email}</td>
      <td>{props.user.FirstName}</td>
      <td>{props.user.LastName}</td>
      <td>{props.user.DisplayName}</td>
      <td>{props.user.Company}</td>
      <td />
    </tr>
  );
};

export default UserRow;
