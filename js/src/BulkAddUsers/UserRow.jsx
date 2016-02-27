module.exports = React.createClass({

  getInitialState() {
    return {
    }
  },

  render() {
    return (
      <tr>
       <td>{this.props.user.Email}</td>
       <td>{this.props.user.FirstName}</td>
       <td>{this.props.user.LastName}</td>
       <td>{this.props.user.DisplayName}</td>
       <td>{this.props.user.Company}</td>
       <td></td>
      </tr>
    );
  }

});
