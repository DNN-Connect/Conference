module.exports = React.createClass({

  render() {
    var btnClass = "";
    var btnText = "";
    var options = [];
    var btnStyle = {};
    var trackId = (this.props.session.TrackId == null) ? -1 : this.props.session.TrackId;
    for (var i=0;i<this.props.tracks.length;i++) {
      var opt = this.props.tracks[i];
      if (opt.TrackId == trackId) {
        btnClass = "default";
        btnText = opt.Title;
        btnStyle = {
          backgroundColor: opt.BackgroundColor
        }
      } else {
        options.push(
          <li>
            <a href="#" data-id={opt.TrackId}
               onClick={this.props.changeTrack.bind(null, this.props.session, opt)}>{opt.Title}</a>
          </li>
          );
      }
    }
    return (
      <div className="btn-group">
        <button type="button" className={"btn btn-sm btn-" + btnClass} style={btnStyle}>{btnText}</button>
        <button type="button" className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"} style={btnStyle} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          &nbsp;
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
        {options}
        </ul>
      </div>
    );
  }

});
