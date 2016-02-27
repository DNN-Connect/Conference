module.exports = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var speakers = this.props.session.Speakers.map(function(item) {
      return (
        <span className="speaker">{item.Value}</span>
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
      <div className="panel panel-default session" data-slotkey="" data-orig-x="0" data-orig-y="0"
           data-sessionid={this.props.session.SessionId}
           data-plenary={this.props.session.IsPlenary}
           data-toggle="popover" title={this.props.session.Title} 
           data-content={this.props.session.Description + speakerList}
           data-placement="bottom" style={divStyle}>
        <div className="panel-body">
         <div className="speakers">{speakers}</div>
         {this.props.session.Title}          
        </div>
      </div>
    );
  },

  componentDidMount: function() {
  }

});
