/** @jsx React.DOM */
var Comment = React.createClass({
  render: function() {
    return (
            <li>
                <div className="commenterImage">
                  <img src="http://lorempixel.com/50/50/people/6" />
                </div>
                <div className="commentText">
                    <p className="">{this.props.comment.Remarks}</p> 
                    <span className="date sub-text">{this.props.comment.StampLine}</span>
                </div>
            </li>
    );
  }
});

module.exports = Comment;
