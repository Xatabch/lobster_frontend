import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';
import nanoid from 'nanoid';

import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Paginate from '../components/Paginate/Paginate';
import Navbar from '../components/Navbar/Navbar';
import Post from '../components/Post/Post';

class PostsScreen extends Component {
    componentDidMount() {
        this.props.dispatch(postsActions.getPosts());
    }

    onClick(direction) {
        this.props.dispatch(postsActions.getPosts(direction));
    }

    onDeletePost(id) {
        this.props.dispatch(postsActions.deletePost(id));
    }

    render() {
        return ( 
            <Container modifiers="container_theme_posts">
                <Content modifiers="content_theme_posts">
                    {this.props.posts.map(post => {
                        return (
                            <Post key={nanoid()}
                                  id={post.id}
                                  postModifiers="post_theme_posts"
                                  photoSrc={Object.values(post.photos)[0] || ''}
                                  author={post.author}
                                  date={post.publishDate}
                                  authorModifiers="item_theme_author"
                                  dateModifiers="item_theme_create-date"
                                  isOpen={false}
                                  isMyPost={post.isMyPost}
                                  onDelete={this.onDeletePost.bind(this)}>
                                    {post.text.map(p => {
                                        if(post.photos[p]) {
                                            return (
                                                <figure key={nanoid()} className="text__photo">
                                                    <img src={`${HOST}/media/${post.photos[p]}`} />
                                                </figure>
                                            )
                                        } else {
                                            return (
                                                <p key={nanoid()} className="text__paragraph">{p}</p>
                                            )
                                        }
                                    })}
                            </Post>
                        )
                    })}
                <Paginate page={this.props.currentPage}
                          onClick={this.onClick.bind(this)}
                          isNext={this.props.isNext}
                          isLast={this.props.isLast}
                          isEmpty={this.props.isEmpty} />
                </Content>
                <Navbar activeLink="posts"/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: postsSelectors.getPosts(state),
        errorText: postsSelectors.getError(state),
        currentPage: postsSelectors.getCurrentPage(state),
        isNext: postsSelectors.isNext(state),
        isLast: postsSelectors.isLast(state),
        isEmpty: postsSelectors.isEmpty(state)
    };
}

export default connect(mapStateToProps)(PostsScreen);