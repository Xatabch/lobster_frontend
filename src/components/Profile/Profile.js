import React from 'react';
import classnames from 'classnames';
import './Profile.css';

export default function Profile(props) {
    return (
      <div className={classnames('profile', props.modifiers)}>
          <div className="profile__login">{props.profileLogin}</div>
          <div className="profile__follow-info">
            <div className="profile__followers">FOLLOWERS {props.profileFollowers}</div>
            <div className="profile__following">FOLLOWING {props.profileFollowing}</div>
          </div>
          <div className="profile__post-info">
            <div className="profile__posts">POSTS {props.profilePosts}</div>
          </div>
      </div>
    )
}