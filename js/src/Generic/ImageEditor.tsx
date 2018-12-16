import * as React from "react";
import * as Models from "../Models/";

interface IImageEditorProps {
  module: Models.IAppModule;
  width: number;
  height: number;
  update: (data: string) => void;
}

interface IImageEditorState {
  zoomLevel: number;
  top: number;
  left: number;
  img: HTMLImageElement;
  isDragging: boolean;
  startX: number;
  startY: number;
  dragX: number;
  dragY: number;
}

export default class ImageEditor extends React.Component<
  IImageEditorProps,
  IImageEditorState
> {
  refs: {
    canvas: HTMLCanvasElement;
    dialog: any;
  };

  constructor(props: IImageEditorProps) {
    super(props);
    this.state = {
      zoomLevel: 1,
      top: 0,
      left: 0,
      img: new Image(),
      isDragging: false,
      startX: 0,
      startY: 0,
      dragX: 0,
      dragY: 0
    };
  }

  public show(): void {
    this.setState(
      {
        zoomLevel: 1,
        top: 0,
        left: 0,
        img: new Image(),
        isDragging: false,
        startX: 0,
        startY: 0,
        dragX: 0,
        dragY: 0
      },
      () => {
        var ctx = this.refs.canvas.getContext("2d");
        if (ctx) {
          ctx.font = "20px sans-serif";
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.fillText(
            this.props.module.resources.DropImageHere,
            this.props.width / 2,
            this.props.height / 2
          );
        }
        ($(this.refs.dialog) as any).modal("show");
      }
    );
  }

  private onDrop(e: React.DragEvent<HTMLCanvasElement>): void {
    e.preventDefault();
    this.loadImage(e.dataTransfer.files[0]);
  }
  private onMouseDown(e: React.MouseEvent<HTMLCanvasElement>): void {
    this.setState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      dragX: 0,
      dragY: 0
    });
  }
  private onMouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
    if (this.state.isDragging)
      this.setState({ dragX: e.clientX, dragY: e.clientY }, () => {
        this.renderImage();
      });
  }
  private onMouseUp(e: React.MouseEvent<HTMLCanvasElement>): void {
    if (this.state.isDragging) {
      var left = this.state.left + this.state.dragX - this.state.startX;
      var top = this.state.top + this.state.dragY - this.state.startY;
      this.setState(
        {
          left: left,
          top: top,
          isDragging: false,
          startX: 0,
          startY: 0,
          dragX: 0,
          dragY: 0
        },
        () => {
          this.renderImage();
        }
      );
    }
  }
  private onMouseOut(e: React.MouseEvent<HTMLCanvasElement>): void {
    this.setState(
      { isDragging: false, startX: 0, startY: 0, dragX: 0, dragY: 0 },
      () => {
        this.renderImage();
      }
    );
  }
  private loadImage(img: File): void {
    if (!img.type.match(/image.*/)) {
      console.log("The dropped file is not an image: ", img.type);
      return;
    }
    var reader = new FileReader();
    reader.onload = (e: any) => {
      var img = this.state.img;
      img.src = e.target.result;
      img.onload = () => {
        this.setState({ img: img }, () => {
          this.cropAndCenterImage();
        });
      };
    };
    reader.readAsDataURL(img);
  }
  private renderImage(): void {
    var ctx = this.refs.canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, this.props.width, this.props.height);
      ctx.drawImage(
        this.state.img,
        this.state.left + this.state.dragX - this.state.startX,
        this.state.top + this.state.dragY - this.state.startY,
        this.state.img.width * this.state.zoomLevel,
        this.state.img.height * this.state.zoomLevel
      );
    }
  }
  private cropAndCenterImage(): void {
    var zoomX = this.props.width / this.state.img.width;
    var zoomY = this.props.height / this.state.img.height;
    var top = 0;
    var left = 0;
    if (zoomX > zoomY) {
      // must use width
      top = -0.5 * (zoomX * this.state.img.height - this.props.height);
    } else {
      left = -0.5 * (zoomY * this.state.img.width - this.props.width);
    }
    this.setState(
      {
        zoomLevel: zoomX > zoomY ? zoomX : zoomY,
        top: top,
        left: left
      },
      () => {
        this.renderImage();
      }
    );
  }

  private update(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    ($(this.refs.dialog) as any).modal("hide");
    this.props.update(this.refs.canvas.toDataURL("image/png"));
  }

  public render(): JSX.Element {
    return (
      <div
        className="modal fade"
        ref="dialog"
        role="dialog"
        aria-labelledby="cmModalLabel"
        aria-hidden="true"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">
                {this.props.module.resources.Edit}
              </h4>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <canvas
                style={styles.canvas}
                ref="canvas"
                width={this.props.width}
                height={this.props.height}
                onDrop={e => this.onDrop(e)}
                onDragEnter={e => e.preventDefault()}
                onDragLeave={e => e.preventDefault()}
                onDragOver={e => e.preventDefault()}
                onMouseDown={e => this.onMouseDown(e)}
                onMouseMove={e => this.onMouseMove(e)}
                onMouseUp={e => this.onMouseUp(e)}
                onMouseOut={e => this.onMouseOut(e)}
              />
              <input
                type="range"
                min={0.01}
                max={2}
                step={0.01}
                value={this.state.zoomLevel}
                onChange={e =>
                  this.setState(
                    { zoomLevel: parseFloat(e.target.value) },
                    () => {
                      this.renderImage();
                    }
                  )
                }
              />
            </div>
            <div className="modal-footer">
              <a
                href="#"
                className="btn btn-default"
                data-dismiss="modal"
              >
                {this.props.module.resources.Cancel}
              </a>
              <a
                href="#"
                className="btn btn-primary"
                onClick={e => {
                  this.update(e);
                }}
              >
                {this.props.module.resources.Update}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var styles = {
  canvas: {
    backgroundColor: "#eee"
  }
};
