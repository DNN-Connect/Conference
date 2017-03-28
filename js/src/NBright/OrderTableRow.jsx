var StatusButton = require('./StatusButton.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        return (
            <tr>
                <td style={colStyle(75)}>{moment(this.props.order.CreatedDate).format('l')}</td>
                <td style={colStyle(150)}>{this.props.order.OrderNr}</td>
                <td>{this.props.order.OrderedBy}</td>
                <td style={colStyle(50, true)}>{this.props.order.Total.toFixed(2)}</td>
                <td style={colStyle(20, true)}>{this.props.order.NrParticipants}</td>
                <td style={colStyle(200)}>
                    <StatusButton options={this.props.statusOptions} onStatusChange={newStatus => this.props.statusChange(this.props.order, newStatus)} selected={this.props.order.OrderStatus} />
                </td>
                <td style={colStyle(32)}>
                    <button className="btn btn-default" onClick={e => this.props.addAuditClick(this.props.order.ItemId, e)}>
                        <i className="glyphicon glyphicon-plus" />
                    </button>
                </td>
                <td style={colStyle(32)}>
                    <button className="btn btn-default" onClick={e => this.props.showDetailsClick(this.props.order.ItemId, e)}>
                        <i className="glyphicon glyphicon-user" />
                    </button>
                </td>
            </tr>
        );
    }
})