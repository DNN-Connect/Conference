var Session = require('./Session.jsx');

module.exports = React.createClass({

  render() {
    var sessionList = this.props.data.Sessions[this.props.location.LocationId];
    var sessions = null;
    if (sessionList != undefined) {
      sessions = sessionList.map((item) => {
        return (<Session session={item} 
                         attendees={this.props.data.Attendees[item.SessionId]} />);
      });
    }
    return (
<div className={"col-md-" + this.props.colSize + " col-xs-12"}>
 <h2>{this.props.location.Name}</h2>
 {sessions}
</div>
    );
  }

});
