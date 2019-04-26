import * as React from "react";
import * as Models from "../Models/";
import Session from "./Session";

interface ISessionManagerProps {
  module: Models.IAppModule;
  conferenceId: number;
  tracks: Models.ITrack[];
  sessions: Models.ISession[];
  statusOptions: Models.ISwitchButtonOption[];
}

interface ISessionManagerState {
  sessions: Models.ISession[];
  tracks: Models.ITrack[];
  sort: string;
  sortOrder: string;
}

export default class SessionManager extends React.Component<
  ISessionManagerProps,
  ISessionManagerState
> {

  constructor(props: ISessionManagerProps) {
    super(props);
    var tracks = props.tracks;
    var noTrack = new Models.Track();
    noTrack.Title = this.props.module.resources.None;
    tracks.unshift(noTrack);
    this.state = {
      sessions: props.sessions,
      tracks: tracks,
      sort: "Title",
      sortOrder: "asc"
    };
  }

  sortSessions(newSort) {
    var newSortOrder =
      newSort === this.state.sort && this.state.sortOrder === "asc"
        ? "desc"
        : "asc";
    var newList = this.state.sessions;
    newList.sort((a, b) => {
      if (a[newSort] < b[newSort]) {
        return newSortOrder == "asc" ? -1 : 1;
      }
      if (a[newSort] > b[newSort]) {
        return newSortOrder == "asc" ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      sessions: newList,
      sort: newSort,
      sortOrder: newSortOrder
    });
  }

  render() {
    var statusTotals = {};
    var trackTotals = {};
    var trackTotalsAccepted = {};
    var speakerTotals = {};
    var nrSpeakers = 0;
    var sessions = this.state.sessions.map(item => {
      statusTotals[item.Status || 0] =
        statusTotals[item.Status || 0] == undefined
          ? 1
          : statusTotals[item.Status || 0] + 1;
      var trackId = item.TrackId == null ? -1 : item.TrackId;
      trackTotals[trackId] =
        trackTotals[trackId] == undefined ? 1 : trackTotals[trackId] + 1;
      if (item.Status || 0 > 2) {
        trackTotalsAccepted[trackId] =
          trackTotalsAccepted[trackId] == undefined
            ? 1
            : trackTotalsAccepted[trackId] + 1;
        for (var i = 0; i < item.Speakers.length; i++) {
          var sp = item.Speakers[i];
          speakerTotals[sp.Value] =
            speakerTotals[sp.Value] == undefined
              ? 1
              : speakerTotals[sp.Value] + 1;
        }
      }
      return (
        <Session
          session={item}
          statusOptions={this.props.statusOptions}
          tracks={this.state.tracks}
          key={item.SessionId}
          changeStatus={(se, st) => this.changeSessionStatus(se, st)}
          changeTrack={(s, t) => this.changeSessionTrack(s, t)}
        />
      );
    });
    var statusList: JSX.Element[] = [];
    for (var i = 0; i < this.props.statusOptions.length; i++) {
      var so = this.props.statusOptions[i];
      if (statusTotals[so.Id] != undefined) {
        statusList.push(<dt key={"dt" + i.toString()}>{so.Text}</dt>);
        statusList.push(<dd key={"dd" + i.toString()}>{statusTotals[so.Id]}</dd>);
      }
    }
    var trackList: JSX.Element[] = [];
    for (var i = 0; i < this.state.tracks.length; i++) {
      var tr = this.state.tracks[i];
      trackList.push(<dt key={"dd" + i.toString()}>{tr.Title}</dt>);
      trackList.push(
        <dd key={"dt" + i.toString()}>
          {trackTotals[tr.TrackId] == undefined ? 0 : trackTotals[tr.TrackId]}
          &nbsp; (
          {trackTotalsAccepted[tr.TrackId] == undefined
            ? 0
            : trackTotalsAccepted[tr.TrackId]}
          )
        </dd>
      );
    }
    var speakerList: JSX.Element[] = [];
    for (var key in speakerTotals) {
      if (speakerTotals.hasOwnProperty(key)) {
        nrSpeakers++;
        speakerList.push(<dt key={"dt" + key}>{key}</dt>);
        speakerList.push(<dd key={"dd" + key}>{speakerTotals[key]}</dd>);
      }
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <h3>{this.props.module.resources.Statuses}</h3>
            <dl className="dl-horizontal">{statusList}</dl>
          </div>
          <div className="col-sm-4">
            <h3>{this.props.module.resources.Tracks}</h3>
            <dl className="dl-horizontal">{trackList}</dl>
          </div>
          <div className="col-sm-4">
            <h3>
              {this.props.module.resources.Speakers} ({nrSpeakers})
            </h3>
            <dl className="dl-horizontal">{speakerList}</dl>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <table className="table">
              <thead>
                <tr>
                  <th
                    className="sortable"
                    onClick={this.sortSessions.bind(null, "Title")}
                  >
                    {this.props.module.resources.Session}
                  </th>
                  <th
                    className="text-right sortable"
                    onClick={this.sortSessions.bind(null, "NrVotes")}
                  >
                    {this.props.module.resources.Votes}
                  </th>
                  <th
                    className="text-right sortable"
                    onClick={this.sortSessions.bind(null, "Status")}
                  >
                    {this.props.module.resources.Status}
                  </th>
                  <th
                    className="text-right sortable"
                    onClick={this.sortSessions.bind(null, "TrackId")}
                  >
                    {this.props.module.resources.Track}
                  </th>
                </tr>
              </thead>
              <tbody>{sessions}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  changeSessionStatus(session: Models.ISession, newStatus: Models.ISwitchButtonOption) {
    if (newStatus.Confirm != undefined) {
      if (!confirm(newStatus.Confirm)) {
        return;
      }
    }
    this.props.module.service.changeSessionStatus(
      this.props.conferenceId,
      session.SessionId,
      newStatus.Id,
      (data: Models.ISession) => {
        var newList = this.state.sessions.map(s => {
          return s.SessionId === data.SessionId ? data : s;
        });
        this.setState({
          sessions: newList
        });
      }
    );
  }

  changeSessionTrack(sessionId: number, newTrackId: number) {
    this.props.module.service.changeSessionTrack(
      this.props.conferenceId,
      sessionId,
      newTrackId,
      (data: Models.ISession) => {
        var newList = this.state.sessions.map(s => {
          return s.SessionId == data.SessionId ? data : s;
        });
        this.setState({
          sessions: newList
        });
      }
    );
  }
}
