var Location = require("./Location.jsx");

export default class LiveTicker extends React.Component {
  constructor(props) {
    super(props);
    if (props.pollingSeconds == undefined) {
      pollingInterval = 10000;
    } else {
      pollingInterval = props.pollingSeconds * 1000;
    }
    this.state = {
      data: {
        Sessions: []
      }
    };
  }

  componentDidMount() {
    this.lastCheck = new Date();
    this.pollServer();
  }

  render() {
    var colSize = Math.floor(12 / this.props.locations.length);
    var locations = this.props.locations.map(item => {
      return (
        <Location
          location={item}
          module={this.props.module}
          colSize={colSize}
          key={item.LocationId}
          data={this.state.data}
        />
      );
    });
    return (
      <div className="container-fluid">
        <div className="row">{locations}</div>
      </div>
    );
  }

  pollServer() {
    setTimeout(() => {
      this.props.module.service.getNextSessions(
        this.props.conferenceId,
        data => {
          this.lastCheck = new Date(data.CheckTime);
          this.setState({
            data: data
          });
          this.pollServer();
        }
      );
    }, this.pollingInterval);
  }
}
