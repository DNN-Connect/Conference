import * as React from "react";
import * as Models from "../Models/";
import Speaker from "./Speaker";
import { getTableOrder } from "../Common";

interface ISpeakersProps {
  module: Models.IAppModule;
  conferenceId: number;
  sessionId: number;
  speakers: Models.ISessionSpeaker[];
}

interface ISpeakersState {
  speakers: Models.ISessionSpeaker[];
}

export default class Speakers extends React.Component<
  ISpeakersProps,
  ISpeakersState
> {
  refs: {
    newSpeaker: HTMLInputElement;
    newSpeakerId: HTMLInputElement;
    speakersTable: HTMLTableElement;
  };

  constructor(props: ISpeakersProps) {
    super(props);
    this.state = {
      speakers: props.speakers
    };
  }

  render() {
    var speakers = this.state.speakers.map(item => {
      return (
        <Speaker
          module={this.props.module}
          speaker={item}
          key={item.SpeakerId}
          onDelete={s => this.onDelete(s)}
        />
      );
    });
    var addRow = this.props.module.security.CanManage ? (
      <tr>
        <td className="dnnFormItem">
          <input type="text" className="fullwidth" ref="newSpeaker" />
          <input type="hidden" ref="newSpeakerId" />
        </td>
        <td className="btncol">
          <a
            href="#"
            className="btn btn-default"
            onClick={e => {
              e.preventDefault();
              this.onSpeakerAdd();
            }}
            title={this.props.module.resources.Add}
          >
            <span className="glyphicon glyphicon-plus" />
          </a>
        </td>
      </tr>
    ) : null;

    return (
      <table className="table" id="speakersTable">
        <thead>
          <tr>
            <th>{this.props.module.resources.Speakers}</th>
            <th />
          </tr>
        </thead>
        <tbody ref="speakersTable">{speakers}</tbody>
        <tbody>{addRow}</tbody>
      </table>
    );
  }

  componentDidMount() {
    if (this.props.module.security.CanManage) {
      ($(this.refs.newSpeaker) as any).autocomplete({
        minLength: 1,
        source: (request, response) => {
          this.refs.newSpeakerId.value = "";
          this.props.module.service.searchUsers(
            this.props.conferenceId,
            request.term,
            function(data) {
              response(
                data.map(function(item) {
                  return {
                    label: item.DisplayName,
                    value: item.UserId
                  };
                })
              );
            }
          );
        },
        select: (e, ui) => {
          e.preventDefault();
          this.refs.newSpeakerId.value = ui.item.value;
          this.refs.newSpeaker.value = ui.item.label;
        }
      });
    }
    ($(this.refs.speakersTable) as any).sortable({
      update: (event, ui) => {
        this.props.module.service.orderSessionSpeakers(
          this.props.conferenceId,
          this.props.sessionId,
          getTableOrder("speakersTable"),
          () => {}
        );
      }
    });
  }

  onDelete(speaker) {
    this.props.module.service.deleteSessionSpeaker(
      this.props.conferenceId,
      this.props.sessionId,
      speaker.SpeakerId,
      () => {
        var newList: Models.ISessionSpeaker[] = [];
        for (var i = 0; i < this.state.speakers.length; i++) {
          if (this.state.speakers[i].SpeakerId != speaker.SpeakerId) {
            newList.push(this.state.speakers[i]);
          }
        }
        this.setState({
          speakers: newList
        });
      }
    );
  }

  onSpeakerAdd() {
    var newUserId = this.refs.newSpeakerId.value;
    if (newUserId != "") {
      for (var i = 0; i < this.state.speakers.length; i++) {
        if (this.state.speakers[i].SpeakerId.toString() === newUserId) {
          return;
        }
      }
      this.props.module.service.addSessionSpeaker(
        this.props.conferenceId,
        this.props.sessionId,
        parseInt(this.refs.newSpeakerId.value),
        data => {
          this.refs.newSpeakerId.value = "";
          this.refs.newSpeaker.value = "";
          var newList = this.state.speakers;
          newList.push(data);
          this.setState({
            speakers: newList
          });
        }
      );
    }
  }
}
