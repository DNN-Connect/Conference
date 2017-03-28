module.exports = React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        var btn = null;
        if (this.props.participant.ProductName == 'Attendee' && (this.props.participant.OrderStatus == 40 || this.props.participant.OrderStatus == 100)) {
            if (this.props.participant.AttendeeUserId) {
                btn = (<button className="btn btn-sm btn-warning" onClick={e => this.props.toggleParticipantRegistration(this.props.participant, e)}>
                    <i className="glyphicon glyphicon-minus" />
                </button>)
            } else {
                btn = (<button className="btn btn-sm btn-success" onClick={e => this.props.toggleParticipantRegistration(this.props.participant, e)}>
                    <i className="glyphicon glyphicon-plus" />
                </button>)
            }
        }
        return (
            <tbody>
                <tr>
                    <td style={colStyle(50)}>{this.props.participant.ProductName}</td>
                    <td>{this.props.participant.FirstName}</td>
                    <td>{this.props.participant.LastName}</td>
                    <td>{this.props.participant.Email}</td>
                    <td style={colStyle(32)} rowSpan={2}>{btn}</td>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <em>Staying from {moment(this.props.participant.Arrival).format('l')} to {moment(this.props.participant.Departure).format('l')}</em>
                    </td>
                </tr>
            </tbody>
        );
    }
})