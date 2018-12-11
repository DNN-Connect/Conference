var Tag = require("./Tag.jsx");

export default class Tags extends React.Component {
  resources = null;
  service = null;

  constructor(props) {
    super(props);
    this.resources = ConnectConference.modules[props.moduleId].resources;
    this.service = ConnectConference.modules[props.moduleId].service;
    this.state = {
      tags: props.tags,
      newTagId: -1
    };
  }

  render() {
    var tagList = this.state.tags.map(
      function(item) {
        return (
          <Tag tag={item} key={item.TagId} onRemoveTag={this.onRemoveTag} />
        );
      }.bind(this)
    );
    return (
      <div className="bootstrap-tagsinput">
        {tagList}
        <input
          type="text"
          placeholder={this.props.placeholder}
          className="taginput"
          ref="newTag"
          onKeyPress={this.onNewTagKeyPress}
        />
        <input
          type="hidden"
          name={this.props.name}
          value={JSON.stringify(this.state.tags)}
        />
      </div>
    );
  }

  componentDidMount() {
    $(document).ready(
      function() {
        $(this.refs.newTag.getDOMNode()).autocomplete({
          minLength: 1,
          source: function(request, response) {
            this.service.searchTags(
              this.props.conferenceId,
              request.term,
              function(data) {
                response(data);
              }
            );
          }.bind(this),
          select: function(e, ui) {
            e.preventDefault();
            this.addTag(ui.item.label, ui.item.value);
            this.refs.newTag.getDOMNode().value = "";
          }.bind(this)
        });
      }.bind(this)
    );
  }

  onRemoveTag(tagId, e) {
    e.preventDefault();
    var newTagList = [];
    for (var i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagId != tagId) {
        newTagList.push(this.state.tags[i]);
      }
    }
    this.setState({
      tags: newTagList
    });
  }

  onNewTagKeyPress(e) {
    switch (e.charCode) {
      case 13:
      case 44:
        e.preventDefault();
        var newTag = this.refs.newTag.getDOMNode().value;
        this.addTag(newTag);
        this.refs.newTag.getDOMNode().value = "";
    }
  }

  addTag(tagName, tagId) {
    var newTagList = this.state.tags;
    var shouldAdd = true;
    for (var i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagName == tagName) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      var newTag = {
        TagId: tagId == undefined ? this.state.newTagId : tagId,
        TagName: tagName
      };
      newTagList.push(newTag);
    }
    this.setState({
      tags: newTagList,
      newTagId:
        tagId == undefined ? this.state.newTagId - 1 : this.state.newTagId
    });
  }
}
