import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignUpScreen.css';

import * as signupActions from '../store/signup/actions';
import * as signupSelectors from '../store/signup/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Bar from '../components/Bar/Bar';
import Head from '../components/Head/Head';
import Logo from '../components/Logo/Logo';
import Links from '../components/Links/Links';
import Forms from '../components/Forms/Forms';
import Post from '../components/Post/Post';
import TextForm from '../components/TextForm/TextForm';
import FormButton from '../components/FormButton/FormButton';
import { Link } from 'react-router';

class SignUpScreen extends Component {
    componentDidMount() {
        this.props.dispatch(signupActions.checkAuth());
    }

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

    onPasswordRepeatBlur() {
        this.props.dispatch(signupActions.checkPasswordRepeat());
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(signupActions.signup());
    }

    render() {
        return ( 
            <Container modifiers="container_theme_singup">
                <Head>
                    <Logo />
                </Head>
                <Content modifiers="content_theme_singup">
                    <Bar modifiers="bar_theme_left">
                        <Post
                            headerText="Click on me"
                            author="Ivan"
                            date={new Date()}
                            authorModifiers="item_theme_author"
                            dateModifiers="item_theme_create-date"
                            isOpen={false} >
                        <p className="text__paragraph">Hello, and welcome to our social network Lobster</p>
                        </Post>
                    </Bar>
                    <Bar modifiers="bar_theme_right">
                        <Content modifiers="content_theme_forms">
                            <Links modifiers="links_theme_singup">
                                <Link className="link" to="/signin">Sign in</Link>
                                <span className="or">or</span>
                                <Link className="link link_theme_active" to="/signup">Sign up</Link>
                            </Links>
                            <Forms onSubmit={this.onSubmit.bind(this)}
                                   modifiers="forms_theme_singup">
                                <TextForm labelText="email"
                                          inputType="text"
                                          placeholderText="Enter your email"
                                          modifiers="text-form_theme_signup"
                                          errorText={this.props.emailError}
                                          inputValue={this.props.email}
                                          onChange={this.onChangeEmail.bind(this)} />
                                <TextForm labelText="login"
                                          inputType="text"
                                          placeholderText="Only latin characters"
                                          modifiers="text-form_theme_signup"
                                          errorText={this.props.loginError}
                                          inputValue={this.props.login}
                                          onChange={this.onChangeLogin.bind(this)} />
                                <TextForm labelText="password"
                                          inputType="password"
                                          placeholderText="From 8 symbols"
                                          modifiers="text-form_theme_signup"
                                          errorText={this.props.passwordError}
                                          inputValue={this.props.password}
                                          onChange={this.onChangePassword.bind(this)} />
                                <TextForm labelText="repeat password"
                                          inputType="password"
                                          placeholderText="Repeat password"
                                          modifiers="text-form_theme_signup"
                                          errorText={this.props.passwordRepeatError}
                                          inputValue={this.props.passwordRepeat}
                                          onChange={this.onChangePasswordRepeat.bind(this)}
                                          onBlur={this.onPasswordRepeatBlur.bind(this)} />
                                <FormButton modifiers="form-button_theme_signup" buttonText="Sign up" />
                            </Forms>
                        </Content>
                    </Bar>
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