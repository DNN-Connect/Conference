module.exports = React.createClass({

  render() {
    return (
      <tr>
       <td className="nrcol">{this.props.index + 1}.</td>
       <td>{this.props.attendee.LastName}, {this.props.attendee.FirstName}</td>
       <td>{this.props.attendee.Email}</td>
       <td>{this.props.attendee.Company}</td>
       <td>{this.props.attendee.AttCode}</td>
       <td className="btncol">
         <a href="#" className="btn btn-sm btn-default"
            onClick={this.props.editClick.bind(null, this.props.attendee)}>
           <span className="glyphicon glyphicon-pencil"></span>
         </a>
       </td>
      </tr>
    );
  }

});
