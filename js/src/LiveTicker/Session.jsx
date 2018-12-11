export default class Session extends React.Component {
  render() {
    var attendees = null;
    if (this.props.attendees.length != 0) {
      var attendeeList = this.props.attendees.map(item => {
        return <p>{item.SessionAttendeeName}</p>;
      });
      attendees = (
        <div className="attendees">
          <h4>Attending</h4>
          {attendeeList}
        </div>
      );
    }
    var start = moment(this.props.session.SessionDateAndTime);
    var end = moment(this.props.session.SessionEnd);
    var speakers = this.props.session.Speakers.map(item => {
      return <span>{item.Value}</span>;
    });
    var subtitle =
      this.props.session.SubTitle == null ? null : (
        <div className="subTitle">{this.props.session.SubTitle}</div>
      );
    var boxStyle = {
      backgroundColor: this.props.session.BackgroundColor
    };
    var style1 = {
      borderColor: this.props.session.BackgroundColor
    };
    var style2 = {
      backgroundColor: this.props.session.BackgroundColor,
      borderColor: this.props.session.BackgroundColor
    };
    var style3 = {
      borderTopColor: this.props.session.BackgroundColor,
      borderBottomColor: this.props.session.BackgroundColor
    };
    return (
      <div className="session">
        <div className="panel panel-default" style={style1}>
          <div className="panel-heading" style={style2}>
            <span className="glyphicon glyphicon-time" />&nbsp;
            <span className="time">{start.format("H:mm")}</span>&nbsp;-&nbsp;
            <span className="time">{end.format("H:mm")}</span>
            <span className="pull-right headSub">{start.fromNow()}</span>
          </div>
          <div className="panel-body" style={style3}>
            <div className="sessionTitle">
              {this.props.session.Title}
              {subtitle}
            </div>
            <div className="speakers">{speakers}</div>
            {attendees}
          </div>
        </div>
      </div>
    );
  }
}
