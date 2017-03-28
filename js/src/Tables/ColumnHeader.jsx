module.exports = React.createClass({
    getInitialState() {
        return {};
    },

    clicked() {
        if (this.props.SortField == this.props.ColumnName) {
            this.props.SortClick(this.props.ColumnName, !this.props.SortReverse);
        } else {
            this.props.SortClick(this.props.ColumnName, false);
        }
    },

    render() {
        var style = {
            cursor: "pointer"
        }
        return (
            <th onClick={this.clicked} style={style}>
                {this.props.Heading}
            </th>
        );
    }
})