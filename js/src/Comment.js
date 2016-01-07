/** @jsx React.DOM */
var Comment = React.createClass({
  render: function() {
    return (
      <li className="list-group-item">
          <div className="row">
              <div className="col-xs-2 col-md-1">
                  <img src="http://placehold.it/80" className="img-circle img-responsive" alt="" /></div>
              <div className="col-xs-10 col-md-11">
                  <div className="comment-details">{this.props.comment.StampLine}</div>
                  <div className="comment-text">{this.props.comment.Remarks}</div>
                  <div className="action">
                      <button type="button" className="btn btn-primary btn-xs" title="Edit">
                          <span className="glyphicon glyphicon-pencil"></span>
                      </button>
                      <button type="button" className="btn btn-success btn-xs" title="Approved">
                          <span className="glyphicon glyphicon-ok"></span>
                      </button>
                      <button type="button" className="btn btn-danger btn-xs" title="Delete">
                          <span className="glyphicon glyphicon-trash"></span>
                      </button>
                  </div>
              </div>
          </div>
      </li>
    );
  }
});

module.exports = Comment;
