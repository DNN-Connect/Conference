module.exports = React.createClass({

    getInitialState() {
        return {
        }
    },

    render() {
        var btnClass = "";
        var btnText = "";
        var options = [];
        var style = {
            color: "#fff"
        };
        var liStyle = {
            listStyleType: "none"
        }
        btnClass = 'default';
        for (var i = 0; i < this.props.options.length; i++) {
            var opt = this.props.options[i];
            if (opt.Id == this.props.selected) {
                style.backgroundColor = opt.Color;
                style.borderColor = opt.Color;
                btnText = opt.Text;
            } else {
                options.push(
                    <li style={liStyle}>
                        <a href="#" data-id={opt.Id}
                            onClick={this.statusChange.bind(null, opt)}>{opt.Text}</a>
                    </li>
                );
            }
        }
        return (
            <div className="btn-group">
                <button type="button" className={"btn btn-sm btn-" + btnClass} style={style}>{btnText}</button>
                <button type="button" className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"} style={style} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    &nbsp;
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        );
    },

    statusChange(newStatus, e) {
        e.preventDefault();
        if (!confirm('Do you wish to change the status to ' + newStatus.Text + '?')) {
            return;
        }
        this.props.onStatusChange(newStatus);
    }

});
