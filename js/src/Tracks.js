/** @jsx React.DOM */
var Track = require('./Track');

var Tracks = React.createClass({

  resources: null,
  service: null,

  getInitialState: function() {
    this.resources = ConnectConference.modules[this.props.moduleId].resources;
    this.service = ConnectConference.modules[this.props.moduleId].service;
    var trackList = [];
    for (i = 0; i < this.props.tracks.length; i++) {
      var track = this.props.tracks[i];
      track.Selected = (this.props.initialData.indexOf(track.TrackId) > -1);
      trackList.push(track);
    }
    return {
      tracks: this.props.tracks,
      selection: this.props.initialData
    }
  },

  render: function() {
    var trackList = this.state.tracks.map(function(item) {
      return <Track track={item} key={item.TrackId} onCheckClick={this.onCheckClick} />
    }.bind(this));
    return (
      <div>
        <ul className="list-group checked-list-box">
          {trackList}
        </ul>
        <input type="hidden" name={this.props.name} value={JSON.stringify(this.state.selection)} />
      </div>
    );
  },

  componentDidMount: function() {},

  onCheckClick: function(track,e) {
    e.preventDefault();
    track.Selected = !track.Selected;
    var newList=[];
    for (i = 0; i < this.state.tracks.length; i++) {
      if (this.state.tracks[i].TrackId == track.TrackId) {
        newList.push(track);
      } else {
        newList.push(this.state.tracks[i]);
      }
    }
    var newSelection=[];
    for (i = 0; i < newList.length; i++) {
      if (newList[i].Selected) {
        newSelection.push(newList[i].TrackId);
      }
    }
    this.setState({
      tracks: newList,
      selection: newSelection
    });
  }

});

module.exports = Tracks;
