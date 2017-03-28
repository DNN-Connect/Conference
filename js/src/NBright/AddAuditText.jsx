module.exports = React.createClass({
    getInitialState() {
        return {
            ItemId: -1
        };
    },

    show(itemId) {
        this.setState({
            ItemId: itemId
        }, () => {
            $(this.refs.popup.getDOMNode()).modal('show');
        });
    },

    cmdSave() {
        $(this.refs.popup.getDOMNode()).modal('hide');
        this.props.save(this.state.ItemId, this.refs.txtInput.getDOMNode().value);
    },

    render() {
        return (
            <div className="modal fade" tabindex="-1" role="dialog" ref="popup">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Title</h4>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" ref="txtInput" placeholder="Audit Text" />
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