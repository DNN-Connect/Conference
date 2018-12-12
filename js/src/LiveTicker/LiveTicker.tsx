import * as React from "react";
import * as Models from "../Models/";
import Location from "./Location";

interface ILiveTickerProps {
  module: Models.IAppModule;
  conferenceId: number;
  pollingSeconds: number;
  locations: Models.ILocation[];
}

interface ILiveTickerState {
  pollingInterval: number;
  lastCheck: Date;
  Sessions: Models.ISession[];
  data: {
    Sessions: Models.IKeyedCollection<Models.ISession>;
    Attendees: Models.IKeyedCollection<Models.ISessionAttendee>;
  };
}

export default class LiveTicker extends React.Component<
  ILiveTickerProps,
  ILiveTickerState
> {
  constructor(props: ILiveTickerProps) {
    super(props);
    var pollingInterval = 10000;
    if (props.pollingSeconds == undefined) {
      pollingInterval = 10000;
    } else {
      pollingInterval = props.pollingSeconds * 1000;
    }
    this.state = {
      pollingInterval: pollingInterval,
      lastCheck: new Date(),
      Sessions: [],
      data: {
        Sessions: new Models.KeyedCollection(),
        Attendees: new Models.KeyedCollection()
      }
    };
  }

  componentDidMount() {
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
          this.setState({
            data: data,
            lastCheck: new Date(data.CheckTime)
          });
          this.pollServer();
        }
      );
    }, this.state.pollingInterval);
  }
}
