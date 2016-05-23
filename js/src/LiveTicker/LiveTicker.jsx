var Location = require('./Location.jsx');

module.exports = React.createClass({

  getInitialState() {
    if (this.props.pollingSeconds == undefined) {
      this.pollingInterval = 10000;
    } else {
      this.pollingInterval = this.props.pollingSeconds * 1000;
    }
    return {
      data: {
        Sessions: []
      }
    }
  },

  componentDidMount() {
    this.lastCheck = new Date();
    this.pollServer();
  },

  render() {
    var colSize = Math.floor(12 / this.props.locations.length);
    var locations = this.props.locations.map((item) => {
      return <Location location={item} module={this.props.module}
                       colSize={colSize} key={item.LocationId}
                       data={this.state.data} />
    });
    return (
<div className="container-fluid">
 <div className="row">
  {locations}
 </div>
</div>
    );
  },

  pollServer() {
    setTimeout(() => {
      this.props.module.service.getNextSessions(this.props.conferenceId, (data) => {
        this.lastCheck = new Date(data.CheckTime);
        this.setState({
          data: data
        });
        this.pollServer();
      });
    }, this.pollingInterval);
  }
});
