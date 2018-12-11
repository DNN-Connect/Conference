export default class SchedulerScheduledSession extends React.Component {
  render() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return <span className="speaker">{item.Value}</span>;
    });
    var speakerList = "<br/>";
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + "</span>";
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
        ref="Session"
        data-sessionid={this.props.session.SessionId}
        data-day={this.props.session.DayNr}
        style={divStyle}
      >
        <div className="panel-body">
          <div className="speakers">{speakers}</div>
          {this.props.session.Title}
        </div>
      </div>
    );
  }

  componentDidMount() {
    $(document).ready(
      function() {
        this.props.sessionPlace(this.refs.Session.getDOMNode());
      }.bind(this)
    );
  }

  componentDidUpdate() {
    this.props.sessionPlace(this.refs.Session.getDOMNode());
  }
}
