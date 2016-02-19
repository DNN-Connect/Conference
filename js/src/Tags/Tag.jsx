var Tag = React.createClass({
  render: function() {
    return (
      <span className="tag label label-info">{this.props.tag.TagName}
       <span data-role="remove" onClick={this.props.onRemoveTag.bind(null, this.props.tag.TagId)}></span>
      </span>
    );
  }
});

module.exports = Tag;