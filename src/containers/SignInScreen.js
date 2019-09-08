import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignInScreen.css';

import * as signinActions from '../store/signin/actions';
import * as signinSelectors from '../store/signin/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Title from '../components/Title/Title';
import Subtitle from '../components/Subtitle/Subtitle';
import Forms from '../components/Forms/Forms';
import TextForm from '../components/TextForm/TextForm';
import FormButton from '../components/FormButton/FormButton';
import { Link } from 'react-router';

class SignInScreen extends Component {
    onChangeLogin(char) {
        this.props.dispatch(signinActions.enterLogin(char));
    }

    onChangePassword(char) {
        this.props.dispatch(signinActions.enterPassword(char));
    }

    onLoginBlur() {
        this.props.dispatch(signinActions.checkLogin());
    }

    render() {
        return ( 
            <Container modifiers="container_theme_signin">
                <Content modifiers="content_theme_signin">
                    <Title modifiers="title_theme_center" titleText="Lobster" />
                    <Subtitle modifiers="subtitle_theme_center subtitle_theme_signin" subtitleText="Sign in" />
                    <Forms modifiers="forms_theme_signin">
                        <TextForm 
                            labelText="Email or login"
                            inputType="text"
                            modifiers="text-form_theme_signin"
                            errorText={this.props.loginError}
                            inputValue={this.props.login}
                            onChange={this.onChangeLogin.bind(this)} 
                            onBlur={this.onLoginBlur.bind(this)} />
                        <TextForm 
                            labelText="Password"
                            inputType="password"
                            modifiers="text-form_theme_signin"
                            errorText={this.props.passwordError}
                            inputValue={this.props.password}
                            onChange={this.onChangePassword.bind(this)} />
                        <FormButton buttonText="Sign In"/>
                    </Forms>
                    <Link className="link link_theme_signin" to={"/signup"}>Sign Up</Link>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { 
        login: signinSelectors.getLogin(state),
        loginError: signinSelectors.getLoginError(state),
        password: signinSelectors.getPassword(state),
        passwordError: signinSelectors.getPasswordError(state)
    };
}

export default connect(mapStateToProps)(SignInScreen);