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

class SignInScreen extends Component {
    onChangeLogin(char) {
        this.props.dispatch(signinActions.enterLogin(char));
    }

    onChangePassword(char) {
        this.props.dispatch(signinActions.enterPassword(char));
    }

    render() {
        return ( 
            <Container>
                <Content>
                    <Title titleText="Lobster" />
                    <Subtitle subtitleText="Sign in" />
                    <Forms>
                        <TextForm 
                            labelText="Email or login"
                            inputType="text"
                            errorText={this.props.loginError}
                            inputValue={this.props.login}
                            onChange={this.onChangeLogin.bind(this)} />
                        <TextForm 
                            labelText="Password"
                            inputType="password"
                            descriptionText="more than 8 char"
                            errorText={this.props.passwordError}
                            inputValue={this.props.password}
                            onChange={this.onChangePassword.bind(this)} />
                        <FormButton buttonText="Sign In"/>
                    </Forms>
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