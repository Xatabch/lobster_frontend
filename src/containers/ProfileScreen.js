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

class ProfileScreen extends Component {
    componentDidMount() {
        this.props.dispatch(profileActions.getUserProfile());
    }

    render() {
        return ( 
            <Container>
                <Content modifiers="content_theme_profile">
                    <Head>
                        <Logo />
                    </Head>
                    <Profile modifiers="profile_theme_profile" 
                             profileLogin={this.props.login}
                             profileFollowers={this.props.profileFollowers}
                             profileFollowing={this.props.profileFollowing}
                             profilePosts={this.props.profilePosts} />
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
        profilePosts: profileSelectors.getPosts(state)
    };
}

export default connect(mapStateToProps)(ProfileScreen);