/** @jsx React.DOM */
var Track = React.createClass({
  render: function() {
    var classes = "glyphicon";
    if (this.props.track.Selected) {
      classes += " glyphicon-check";
    } else {
      classes += " glyphicon-unchecked";
    }
    return (
      <li className="list-group-item" onClick={this.props.onCheckClick.bind(null, this.props.track)}>
        <input type="checkbox" className="hidden" />
        <span className={classes}></span>
        {this.props.track.Title}
      </li>
    );
  }
});

module.exports = Track;