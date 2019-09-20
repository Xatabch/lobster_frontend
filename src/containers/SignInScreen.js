import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignInScreen.css';

import * as signinActions from '../store/signin/actions';
import * as signinSelectors from '../store/signin/reducer';

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

class SignInScreen extends Component {
    componentDidMount() {
        this.props.dispatch(signinActions.checkAuth());
    }

    onChangeLogin(char) {
        this.props.dispatch(signinActions.enterLogin(char));
    }

    onChangePassword(char) {
        this.props.dispatch(signinActions.enterPassword(char));
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(signinActions.signin());
    }

    render() {
        return ( 
            <Container modifiers="container_theme_signin">
                <Head>
                    <Logo />
                </Head>
                <Content modifiers="content_theme_signin">
                    <Bar modifiers="bar_theme_left">
                        <Post photoSrc="https://dribbble.s3.amazonaws.com/users/1619633/screenshots/7105405/downloads/Buffalo%201.png"
                            headerText="Click on me"
                            author="Ivan"
                            date="31.08.2019"
                            authorModifiers="item_theme_author"
                            dateModifiers="item_theme_create-date"
                            isOpen={false} >
                        <p className="text__paragraph">Hello, and welcome to our social network Lobster</p>
                        </Post>
                    </Bar>
                    <Bar modifiers="bar_theme_right">
                        <Content modifiers="content_theme_forms">
                            <Links modifiers="links_theme_signin">
                                <Link className="link link_theme_active" to="/signin">Sign in</Link>
                                <span className="or">or</span>
                                <Link className="link" to="/signup">Sign up</Link>
                            </Links>
                            <Forms onSubmit={this.onSubmit.bind(this)}
                                   modifiers="forms_theme_signin">
                                <TextForm labelText="email or login"
                                          inputType="text"
                                          placeholderText="Enter your email"
                                          modifiers="text-form_theme_signin"
                                          errorText={this.props.loginError}
                                          inputValue={this.props.login}
                                          onChange={this.onChangeLogin.bind(this)} />
                                <TextForm labelText="password"
                                          inputType="password"
                                          placeholderText="Enter your password"
                                          modifiers="text-form_theme_signin"
                                          errorText={this.props.passwordError}
                                          inputValue={this.props.password}
                                          onChange={this.onChangePassword.bind(this)} />
                                <FormButton modifiers="form-button_theme_signin" buttonText="Sign in" />
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
        login: signinSelectors.getLogin(state),
        loginError: signinSelectors.getLoginError(state),
        password: signinSelectors.getPassword(state),
        passwordError: signinSelectors.getPasswordError(state)
    };
}

export default connect(mapStateToProps)(SignInScreen);