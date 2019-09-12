import React from 'react';
import classnames from 'classnames';
import './Post.css';

export default class Post extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      }
    }
    
    onOpen() {
      this.setState({isOpen: true});
    }

    onClose(e) {
      this.setState({isOpen: false});
      e.stopPropagation();
    }
    
    render() {
      return (
        <div className={classnames('post', this.props.postModifiers, this.state.isOpen ? 'post_theme_open' : '')}
             onClick={() => this.onOpen()}>
          <div className="post__photos">
            {this.state.isOpen ? <div className="post__close" onClick={(e) => this.onClose(e)}></div> : null}
            <img className="photos__photo" src={this.props.photoSrc} alt="upload error" />
            <h1 className="photos__header">{this.props.headerText}</h1>
          </div>
          <div className="post__items">
            <span className="items__item item_theme_author">{this.props.author}</span>
            <span className="items__item">{this.props.date}</span>
          </div>
          {this.state.isOpen ? <div className="post__text">{this.props.children}</div> : null}
        </div>
      )
    }
  }