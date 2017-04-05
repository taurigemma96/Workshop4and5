import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
      };

      if (this.didUserLike()) {
        unlikeComment(this.state.feedItem, 4 , this.state.index,callbackFunction);
      } else {
        likeComment(this.state.feedItem, 4, this.state.index,callbackFunction);
      }
    }
  }
  didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  render() {
    var likeButtonText = "Like";
     if (this.didUserLike()) {
       likeButtonText = "Unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{this.state.likeCounter.length} <span className="glyphicon glyphicon-thumbs-up"></span> {likeButtonText}</a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
