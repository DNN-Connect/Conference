var Status = require('./Status.jsx'),
    Track = require('./Track.jsx');

module.exports = React.createClass({

  render() {
    var speakers = this.props.session.Speakers.map((item) => {
      return item.Value;
    });
    return (
      <tr>
       <td>
        {this.props.session.Title}<br />
        <span className="details">{speakers.join(', ')}</span><br />
        <span className="details">{this.props.session.NrVotes} {this.props.module.resources.Votes}</span>
       </td>
       <td className="text-right"><Status options={this.props.statusOptions}
                   session={this.props.session}
                   key={'status' + this.props.session.SessionId}
                   changeStatus={this.props.changeStatus} /></td>
       <td className="text-right"><Track tracks={this.props.tracks}
                   session={this.props.session}
                   key={'track' + this.props.session.SessionId}
                   changeTrack={this.props.changeTrack} /></td>
      </tr>
    );
  }

});
