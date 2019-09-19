import React from 'react';
import classnames from 'classnames';
import './Post.css';

function OpenPost(props) {
  return (
    <div className="open-post">
      <div className="post__photos">
            <div className="post__close" onClick={(e) => props.onClose(e)}></div>
            <img className="photos__photo" src={`${HOST}/media/${props.photoSrc}`} alt="" />
            <h1 className="photos__header">{props.headerText}</h1>
          </div>
          <div className="post__items">
            <span className="items__item item_theme_author">{props.author}</span>
            <span className="items__item">{props.date}</span>
          </div>
          <div className="post__text">{props.children}</div>
        </div>
  )
}

export default class Post extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      }
    }
    
    onOpen(e) {
      this.setState({isOpen: true});
    }

    onClose(e) {
      this.setState({isOpen: false});
      e.stopPropagation();
    }
    
    render() {
      return (
        <div className={classnames('post', this.props.postModifiers, this.state.isOpen ? 'post_theme_open' : '')}
             onClick={(e) => this.onOpen(e)}>
            {this.state.isOpen ? (<OpenPost 
                                            photoSrc={this.props.photoSrc}
                                            headerText={this.props.headerText}
                                            author={this.props.author}
                                            date={this.props.date}
                                            onClose={this.onClose.bind(this)}>{this.props.children}</OpenPost>) : null}
          <div className="post__photos">
            <img className="photos__photo" src={`${HOST}/media/${this.props.photoSrc}`} alt="" />
            <h1 className="photos__header">{this.props.headerText}</h1>
          </div>
          <div className="post__items">
            <span className="items__item item_theme_author">{this.props.author}</span>
            <span className="items__item">{this.props.date}</span>
          </div>
        </div>
      )
    }
  }