import * as React from "react";
import * as Models from "../Models/";

interface ISchedulerScheduledSessionProps {
  session: Models.ISession;
  sessionPlace: (s: HTMLDivElement) => void;
}

interface ISchedulerScheduledSessionState {}

export default class SchedulerScheduledSession extends React.Component<
  ISchedulerScheduledSessionProps,
  ISchedulerScheduledSessionState
> {
  refs: {
    Session: HTMLDivElement;
  };

  constructor(props: ISchedulerScheduledSessionProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $(document).ready(() => {
      this.props.sessionPlace(this.refs.Session);
    });
  }

  componentDidUpdate() {
    this.props.sessionPlace(this.refs.Session);
  }

  public render(): JSX.Element {
    var speakers = this.props.session.Speakers.map((item) => {
      return (
        <span className="speaker" key={item.Key}>
          {item.Value}
        </span>
      );
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    return (
      <div
        className="panel panel-default session scheduled"
        data-slotid={this.props.session.SlotId}
        data-locationid={this.props.session.LocationId}
        data-plenary={this.props.session.IsPlenary}
        data-sessionid={this.props.session.SessionId}
        data-day={this.props.session.DayNr}
        style={divStyle}
        ref="Session"
      >
        <div className="panel-body">
          <div className="speakers">{speakers}</div>
          {this.props.session.Title}
        </div>
      </div>
    );
  }
}
