module.exports = React.createClass({

  render() {
    var btnClass = "";
    var btnText = "";
    var options = [];
    for (var i=0;i<this.props.options.length;i++) {
      var opt = this.props.options[i];
      if (opt.Id == this.props.session.Status) {
        btnClass = opt.ClassName;
        btnText = opt.Text;
      } else {
        options.push(
          <li>
            <a href="#" data-id={opt.Id}
               data-confirm={opt.Confirm}
               onClick={this.props.changeStatus.bind(null, this.props.session, opt)}>{opt.Text}</a>
          </li>
          );
      }
    }
    return (
      <div className="btn-group">
        <button type="button" className={"btn btn-sm btn-" + btnClass}>{btnText}</button>
        <button type="button" className={"btn btn-sm btn-" + btnClass + " dropdown-toggle"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          &nbsp;
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
        {options}
        </ul>
      </div>
    );
  }

});
