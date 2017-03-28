var OrderTableRow = require('./OrderTableRow.jsx'),
    ColumnHeader = require('../Tables/ColumnHeader.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {
            orders: this.props.orders,
            sortField: 'OrderNr',
            sortReverse: false
        };
    },

    sort(sortField, sortReverse) {
        this.setState({
            sortField: sortField,
            sortReverse: sortReverse
        });
    },

    changeStatus(order, newStatus) {
        console.log(order, newStatus);
    },

    render() {
        var statusOptions = [
            { Id: 10, Color: "#bbb", Text: "Incomplete" },
            { Id: 20, Color: "#2d3538", Text: "Waiting for Bank" },
            { Id: 30, Color: "#bbb", Text: "Cancelled" },
            { Id: 40, Color: "#acc413", Text: "Payment OK" },
            { Id: 50, Color: "#c93200", Text: "Payment Not Verified" },
            { Id: 60, Color: "#ea690b", Text: "Waiting for Payment" },
            { Id: 70, Color: "#eb2659", Text: "Waiting for Stock" },
            { Id: 80, Color: "#eb2659", Text: "Waiting" },
            { Id: 90, Color: "#893658", Text: "Shipped" },
            { Id: 100, Color: "#1aa8e3", Text: "Completed" },
            { Id: 110, Color: "#bbb", Text: "Archived" },
            { Id: 120, Color: "#eb2659", Text: "Being Manufactured" }
        ];
        var orders = this.state.orders;
        var sortPrimer = null;
        switch (this.state.sortField) {
            case 'CreatedDate':
                sortPrimer = function (a) { return moment(a).toISOString() };
                break;
            case 'OrderStatus':
                sortPrimer = parseInt;
                break;
            case 'OrderedBy':
                sortPrimer = function (a) { return a.toUpperCase() };
                break;
        }
        orders.sort(sort_by(this.state.sortField, this.state.sortReverse, sortPrimer));
        var rows = orders.map(o => {
            return <OrderTableRow order={o} statusOptions={statusOptions} statusChange={this.changeStatus} />
        });
        return (
            <div>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <ColumnHeader SortField={this.state.sortField} SortReverse={this.state.sortReverse} 
                                Heading="Date" ColumnName="CreatedDate" SortClick={this.sort} />
                            <ColumnHeader SortField={this.state.sortField} SortReverse={this.state.sortReverse} 
                                Heading="Nr" ColumnName="OrderNr" SortClick={this.sort} />
                            <ColumnHeader SortField={this.state.sortField} SortReverse={this.state.sortReverse} 
                                Heading="By" ColumnName="OrderedBy" SortClick={this.sort} />
                            <ColumnHeader SortField={this.state.sortField} SortReverse={this.state.sortReverse} 
                                Heading="Status" ColumnName="OrderStatus" SortClick={this.sort} />
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
})