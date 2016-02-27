module.exports = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        <span className="speaker">
         <a href={window.speakerDetailUrl.replace('-1', item.Key)}>
          {item.Value}
         </a>
        </span>
        );
    });
    var speakerList = '<br/>';
    this.props.session.Speakers.forEach(function(el) {
      speakerList += '<span class="speaker">' + el.Value + '</span>';
    });
    var divStyle = {
      backgroundColor: this.props.session.BackgroundColor
    }
    return (
      <div className="panel panel-default session scheduled embedded" data-slotid={this.props.session.SlotId} 
           data-locationid={this.props.session.LocationId} data-plenary={this.props.session.IsPlenary}
           ref="Session" data-sessionid={this.props.session.SessionId} data-day={this.props.session.DayNr}
           data-toggle="popover" title={this.props.session.Title} 
           data-content={this.props.session.Description + speakerList} style={divStyle}>
       <div className="panel-body">
         <div className="speakers">{speakers}</div>
         <a href={window.sessionDetailUrl.replace('-1', this.props.session.SessionId.toString())}>
         {this.props.session.Title} 
         </a>         
       </div>
      </div>
    );
  }

});
