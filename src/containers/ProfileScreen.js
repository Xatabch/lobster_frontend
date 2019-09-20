import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileScreen.css';

import * as profileActions from '../store/profile/actions';
import * as profileSelectors from '../store/profile/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Profile from '../components/Profile/Profile';
import Head from '../components/Head/Head';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button/Button';
import Logout from '../components/Logout/Logout';

class ProfileScreen extends Component {
    componentDidMount() {
        this.props.dispatch(profileActions.getUserProfile());
    }

    onFollowClick() {
        this.props.dispatch(profileActions.follow());
    }

    onLogoutClick() {
        this.props.dispatch(profileActions.logout());
    }

    render() {
        return ( 
            <Container>
                <Head modifiers="head_theme_profile">
                    <Logo modifiers="logo_theme_profile"/>
                    <Logout onClick={this.onLogoutClick.bind(this)}/>
                </Head>
                <Content modifiers="content_theme_profile">
                    <Profile modifiers="profile_theme_profile" 
                             profileLogin={this.props.login}
                             profileFollowers={this.props.profileFollowers}
                             profileFollowing={this.props.profileFollowing}
                             profilePosts={this.props.profilePosts} />
                    {!this.props.isMyPage ? (<Button modifiers="button_theme_profile" 
                                                    onClick={this.onFollowClick.bind(this)} 
                                                    buttonText={this.props.isFollow ? 'Unfollow' : 'Follow'} />) 
                                                    : null}

                </Content>
                <Navbar activeLink="profile" />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { 
        login: profileSelectors.getLogin(state),
        profileFollowers: profileSelectors.getFollowers(state),
        profileFollowing: profileSelectors.getFollowing(state),
        profilePosts: profileSelectors.getPosts(state),
        isMyPage: profileSelectors.isMyPage(state),
        isFollow: profileSelectors.isFollow(state)
    };
}

export default connect(mapStateToProps)(ProfileScreen);