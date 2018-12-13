import * as React from "react";
import * as Models from "../Models/";
import Tag from "./Tag";

interface ITagsProps {
  module: Models.IAppModule;
  tags: Models.ITag[];
  name: string;
  placeholder: string;
}

interface ITagsState {
  tags: Models.ITag[];
  newTagId: number;
}

export default class Tags extends React.Component<ITagsProps, ITagsState> {
  refs: {
    newTag: HTMLInputElement;
  };

  constructor(props: ITagsProps) {
    super(props);
    this.state = {
      tags: props.tags,
      newTagId: -1
    };
  }

  render() {
    var tagList = this.state.tags.map(item => {
      return (
        <Tag
          tag={item}
          key={item.TagId}
          onRemoveTag={id => this.onRemoveTag(id)}
        />
      );
    });
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
    $(document).ready(() => {
      ($(this.refs.newTag) as any).autocomplete({
        minLength: 1,
        source: function(request, response) {
          this.service.searchTags(
            this.props.conferenceId,
            request.term,
            function(data) {
              response(data);
            }
          );
        },
        select: function(e, ui) {
          e.preventDefault();
          this.addTag(ui.item.label, ui.item.value);
          this.refs.newTag.value = "";
        }
      });
    });
  }

  onRemoveTag(tagId) {
    var newTagList: Models.ITag[] = [];
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
        var newTag = this.refs.newTag.value;
        this.addTag(newTag, undefined);
        this.refs.newTag.value = "";
    }
  }

  addTag(tagName: string, tagId: number | undefined) {
    var newTagList = this.state.tags;
    var shouldAdd = true;
    for (var i = 0; i < this.state.tags.length; i++) {
      if (this.state.tags[i].TagName == tagName) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      var newTag = new Models.Tag();
      newTag.TagId = tagId == undefined ? this.state.newTagId : tagId;
      newTag.TagName = tagName;
      newTagList.push(newTag);
    }
    this.setState({
      tags: newTagList,
      newTagId:
        tagId == undefined ? this.state.newTagId - 1 : this.state.newTagId
    });
  }
}
