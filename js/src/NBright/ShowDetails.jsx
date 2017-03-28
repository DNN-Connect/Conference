var ParticipantRow = require('./ParticipantRow.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {
            ItemId: -1,
            Details: [],
            Log: [],
            FirstRec: {}
        };
    },

    statusToText(status) {
        switch (status) {
            case 10:
                return "Incomplete 010";
            case 20:
                return "Waiting for Bank 020";
            case 30:
                return "Cancelled 030";
            case 40:
                return "Payment OK 040";
            case 50:
                return "Payment Not Verified 050";
            case 60:
                return "Waiting for Payment 060";
            case 70:
                return "Waiting for Stock 070";
            case 80:
                return "Waiting 080";
            case 90:
                return "Shipped 090";
            case 100:
                return "Completed 100";
            case 110:
                return "Archived 110";
            case 120:
                return "Being Manufactured 120";
        }
    },

    show(itemId) {
        this.setState({
            ItemId: itemId
        }, () => {
            this.props.module.service.getOrderAudit(this.props.conferenceId, itemId, (data) => {
                this.setState({
                    Log: data
                }, () => {
                    this.props.module.service.getOrderDetails(this.props.conferenceId, itemId, (data) => {
                        if (data.length > 0) {
                            this.setState({
                                FirstRec: data[0]
                            });
                        }
                        this.setState({
                            Details: data
                        }, () => {
                            $(this.refs.popup.getDOMNode()).modal('show');
                        });
                    });
                });
            });
        });
    },

    cmdSave() {
        $(this.refs.popup.getDOMNode()).modal('hide');
        this.props.save(this.state.ItemId, this.refs.txtInput.getDOMNode().value);
    },

    toggleParticipantRegistration(person, e) {
        e.preventDefault();
        this.props.module.service.toggleParticipant(this.props.conferenceId, this.state.ItemId, person, (data) => {
            this.setState({
                Details: data
            });
        });
    },

    render() {
        var rows = this.state.Details.map(person => {
            return <ParticipantRow participant={person} toggleParticipantRegistration={this.toggleParticipantRegistration} />
        });
        var auditRows = this.state.Log.map(item => {
            var msg = item.Message;
            if (!msg && item.OrderStatus) {
                msg = 'Status: ' + this.statusToText(item.OrderStatus);
            }
            return (<tr>
                <td style={colStyle(50)}>{moment(item.AuditDate).format('l')}</td>
                <td style={colStyle(75)}>{item.Username}</td>
                <td>{msg}</td>
            </tr>)
        });
        return (
            <div className="modal fade" tabindex="-1" role="dialog" ref="popup">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Details</h4>
                        </div>
                        <div className="modal-body">
                            <dl className="dl-horizontal">
                                <dt>Order Nr</dt>
                                <dd>{this.state.FirstRec.OrderNr}</dd>
                                <dt>Order Date and Time</dt>
                                <dd>{moment(this.state.FirstRec.CreatedDate).format('LLL')}</dd>
                                <dt>Ordered By</dt>
                                <dd>{this.state.FirstRec.OrderedBy}</dd>
                                <dt>Status</dt>
                                <dd>{this.statusToText(this.state.FirstRec.OrderStatus)}</dd>
                            </dl>
                            <h4>Participants</h4>
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>First</th>
                                        <th>Last</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {rows}
                            </table>
                            <h4>Audit</h4>
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>{auditRows}</tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={this.cmdSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})