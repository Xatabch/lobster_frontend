import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchScreen.css';

import * as searchActions from '../store/search/actions';
import * as searchSelectors from '../store/search/reducer';

import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import Head from '../components/Head/Head';
import Forms from '../components/Forms/Forms';
import TextForm from '../components/TextForm/TextForm';
import FormButton from '../components/FormButton/FormButton';
import Logo from '../components/Logo/Logo';
import Navbar from '../components/Navbar/Navbar';

class SearchScreen extends Component {
    componentDidMount() {
    }

    render() {
        return ( 
            <Container>
                <Head>
                    <Logo />
                </Head>
                <Content modifiers="content_theme_search">
                    <Forms modifiers="forms_theme_search">
                        <TextForm
                                  inputType="text"
                                  placeholderText="Enter user login"
                                  modifiers="text-form_theme_search" />
                        <FormButton modifiers="form-button_theme_search"
                                    buttonText="search" />
                    </Forms>
                    <ul className="user-list">
                            <ol className="user-list__user"><a className="user__link" href="/profile?nickname=Ivan">Ivan</a></ol>
                            <ol className="user-list__user"><a className="user__link" href="/profile?nickname=Ivan">Ivan</a></ol>
                            <ol className="user-list__user"><a className="user__link" href="/profile?nickname=Ivan">Ivan</a></ol>
                    </ul>
                </Content>
                <Navbar activeLink="search" />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchLogin: searchSelectors.getLogin(state),
        foundProfiles: searchSelectors.getProfiles(state)
    };
}

export default connect(mapStateToProps)(SearchScreen);