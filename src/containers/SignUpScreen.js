import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignUpScreen.css';

import * as signupActions from '../store/signup/actions';
import * as signupSelectors from '../store/signup/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Title from '../components/Title/Title';
import Subtitle from '../components/Subtitle/Subtitle';
import Forms from '../components/Forms/Forms';
import TextForm from '../components/TextForm/TextForm';
import FormButton from '../components/FormButton/FormButton';
import { Link } from 'react-router';

class SignUpScreen extends Component {
    onChangeLogin(char) {
        this.props.dispatch(signupActions.enterLogin(char));
    }

    onChangeEmail(char) {
        this.props.dispatch(signupActions.enterEmail(char));
    }

    onChangePassword(char) {
        this.props.dispatch(signupActions.enterPassword(char));
    }

    onChangePasswordRepeat(char) {
        this.props.dispatch(signupActions.enterPasswordRepeat(char));
    }

    onLoginBlur() {
        this.props.dispatch(signupActions.checkLogin());
    }

    onEmailBlur() {
        this.props.dispatch(signupActions.checkEmail());
    }

    onPasswordBlur() {
        this.props.dispatch(signupActions.checkPassword());
    }

    onPasswordRepeatBlur() {
        this.props.dispatch(signupActions.checkPasswordRepeat());
    }

    render() {
        return ( 
            <Container modifiers="container_theme_signup">
                <Content modifiers="content_theme_signup">
                    <Title modifiers="title_theme_center" titleText="Lobster" />
                    <Subtitle modifiers="subtitle_theme_center" subtitleText="Sign up" />
                    <Forms modifiers="forms_theme_signup">
                        <TextForm 
                            labelText="Login"
                            inputType="text"
                            modifiers="text-form_theme_signup"
                            descriptionText="only latin symbols"
                            errorText={this.props.loginError}
                            inputValue={this.props.login}
                            onChange={this.onChangeLogin.bind(this)} 
                            onBlur={this.onLoginBlur.bind(this)} />
                        <TextForm 
                            labelText="Email"
                            inputType="text"
                            modifiers="text-form_theme_signup"
                            errorText={this.props.emailError}
                            inputValue={this.props.email}
                            onChange={this.onChangeEmail.bind(this)} 
                            onBlur={this.onEmailBlur.bind(this)} />
                        <TextForm 
                            labelText="Password"
                            inputType="password"
                            modifiers="text-form_theme_signup"
                            descriptionText="more than 8 symbols"
                            errorText={this.props.passwordError}
                            inputValue={this.props.password}
                            onChange={this.onChangePassword.bind(this)} 
                            onBlur={this.onPasswordBlur.bind(this)} />
                        <TextForm 
                            labelText="Repeat password"
                            inputType="text"
                            modifiers="text-form_theme_signup"
                            errorText={this.props.passwordRepeatError}
                            inputValue={this.props.passwordRepeat}
                            onChange={this.onChangePasswordRepeat.bind(this)} 
                            onBlur={this.onPasswordRepeatBlur.bind(this)} />
                        <FormButton modifiers="form-button_theme_signup" buttonText="Sign Up"/>
                    </Forms>
                    <Link className="link link_theme_signup" to={"/signin"}>Sign In</Link>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return { 
        login: signupSelectors.getLogin(state),
        loginError: signupSelectors.getLoginError(state),
        email: signupSelectors.getEmail(state),
        emailError: signupSelectors.getEmailError(state),
        password: signupSelectors.getPassword(state),
        passwordError: signupSelectors.getPasswordError(state),
        passwordRepeat: signupSelectors.getPasswordRepeat(state),
        passwordRepeatError: signupSelectors.getPasswordRepeatError(state),
    };
}

export default connect(mapStateToProps)(SignUpScreen);