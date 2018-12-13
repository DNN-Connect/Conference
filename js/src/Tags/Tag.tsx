import * as React from "react";
import * as Models from "../Models/";

interface ITagProps {
  tag: Models.ITag;
  onRemoveTag: (tagId: number) => void;
}

const Tag: React.SFC<ITagProps> = props => {
  return (
    <span className="tag label label-info">
      {props.tag.TagName}
      <span
        data-role="remove"
        onClick={e => {
          e.preventDefault();
          props.onRemoveTag(props.tag.TagId);
        }}
      />
    </span>
  );
};

export default Tag;
