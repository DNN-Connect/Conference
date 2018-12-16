import * as React from "react";
import * as Models from "../Models/";
import ImageEditor from "../Generic/ImageEditor";
import { IAttendee } from "../Models/";

interface IAttendeeImageProps {
  module: Models.IAppModule;
  attendee: Models.IAttendee;
  fieldName: string;
  homeDir: string;
}

interface IAttendeeImageState {
  attendee: Models.IAttendee;
}

export default class AttendeeImage extends React.Component<
  IAttendeeImageProps,
  IAttendeeImageState
> {
  refs: {
    imgEditor: ImageEditor;
  };

  constructor(props: IAttendeeImageProps) {
    super(props);
    this.state = {
      attendee: props.attendee
    };
  }

  updateImage(img: string) {
    this.props.module.service.updateAttendeeImage(
      this.props.attendee.ConferenceId,
      this.props.attendee.UserId,
      img,
      (data: IAttendee) => {
        $("#" + this.props.fieldName).val(
          JSON.stringify({ filename: data.PhotoFilename })
        );
        this.setState({
          attendee: data
        });
      }
    );
  }

  public render(): JSX.Element {
    var d = new Date();
    var path =
      this.props.homeDir +
      this.state.attendee.PhotoFolder +
      this.state.attendee.PhotoFilename +
      "?" +
      d.getTime();
    var ui =
      this.state.attendee.PhotoFilename === null ? (
        <button className="btn btn-default" onClick={e => e.preventDefault()}>
          {this.props.module.resources.SetPicture}
        </button>
      ) : (
        <img
          src={path}
          alt={this.props.attendee.DisplayName}
          style={{ width: "200px", height: "200px", margin: "20px", borderRadius: "10px" }}
        />
      );
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={e => this.refs.imgEditor.show()}
      >
        {ui}
        <ImageEditor
          ref="imgEditor"
          module={this.props.module}
          width={200}
          height={200}
          update={img => this.updateImage(img)}
        />
      </div>
    );
  }
}
