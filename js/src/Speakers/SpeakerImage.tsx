import * as React from "react";
import * as Models from "../Models/";
import ImageEditor from "../Generic/ImageEditor";
import { ISpeaker } from "../Models/";

interface ISpeakerImageProps {
  module: Models.IAppModule;
  speaker: Models.ISpeaker;
  fieldName: string;
  homeDir: string;
}

interface ISpeakerImageState {
  speaker: Models.ISpeaker;
}

export default class SpeakerImage extends React.Component<
  ISpeakerImageProps,
  ISpeakerImageState
> {
  refs: {
    imgEditor: ImageEditor;
  };

  constructor(props: ISpeakerImageProps) {
    super(props);
    this.state = {
      speaker: props.speaker
    };
  }

  updateImage(img: string) {
    this.props.module.service.updateSpeakerImage(
      this.props.speaker.ConferenceId,
      this.props.speaker.UserId,
      img,
      (data: ISpeaker) => {
        $("#" + this.props.fieldName).val(
          JSON.stringify({ filename: data.PhotoFilename })
        );
        this.setState({
          speaker: data
        });
      }
    );
  }

  public render(): JSX.Element {
    var d = new Date();
    var path =
      this.props.homeDir +
      this.state.speaker.PhotoFolder +
      this.state.speaker.PhotoFilename +
      "?" +
      d.getTime();
    var ui =
      this.state.speaker.PhotoFilename === null ? (
        <button className="btn btn-default" onClick={e => e.preventDefault()}>
          {this.props.module.resources.SetPicture}
        </button>
      ) : (
        <img
          src={path}
          alt={this.props.speaker.DisplayName}
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
