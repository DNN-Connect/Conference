var StatusButton = require('./StatusButton.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        return (
            <tr>
                <td>{moment(this.props.order.CreatedDate).format('l')}</td>
                <td>{this.props.order.OrderNr}</td>
                <td>{this.props.order.OrderedBy}</td>
                <td>
                    <StatusButton options={this.props.statusOptions} onStatusChange={newStatus => this.props.statusChange(this.props.order, newStatus)} selected={this.props.order.OrderStatus} />
                </td>
            </tr>
        );
    }
})