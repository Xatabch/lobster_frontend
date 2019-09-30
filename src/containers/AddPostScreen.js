import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './AddPostScreen.css';

import * as addPostActions from '../store/addpost/actions';
import * as addPostSelectors from '../store/addpost/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Head from '../components/Head/Head';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';
import AddPost from '../components/AddPost/AddPost';
import FormButton from '../components/FormButton/FormButton';

class AddPostScreen extends Component {

    onChangeText(text) {
        this.props.dispatch(addPostActions.enterText(text));
    }

    onUploadPhoto(e, hash) {
        this.props.dispatch(addPostActions.uploadPhoto(e.target, hash));
    }

    onSendPost() {
        this.props.dispatch(addPostActions.sendPost());
    }

    render() {
        return ( 
            <Container modifiers="container_theme_addpost">
                <Head modifiers="head_theme_addpost">
                    <Logo modifiers="logo_theme_addpost" />
                    <FormButton modifiers={classnames(this.props.isSend ? "form-button_theme_block" : "", "form-button_theme_addpost")}
                                buttonText="Publish"
                                onClick={!this.props.isSend ? this.onSendPost.bind(this) : null} />
                </Head>
                <Content modifiers="content_theme_addpost">
                    <AddPost onChangeText={this.onChangeText.bind(this)}
                             onUploadPhoto={this.onUploadPhoto.bind(this)} />
                </Content>
                <Navbar activeLink="addpost"/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { 
        postText: addPostSelectors.getText(state),
        isSend: addPostSelectors.isSend(state)
    };
}

export default connect(mapStateToProps)(AddPostScreen);