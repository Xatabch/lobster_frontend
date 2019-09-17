import React from 'react';
import classnames from 'classnames';
import './Navbar.css';

import { Link } from 'react-router';

export default function Navbar(props) {
    return (
        <div className={classnames("navbar", props.modifiers)}>
            <Link className={classnames('link', 'link_theme_navbar', 'navbar__posts', props.activeLink === 'posts' ? 'link_theme_active' : '')} 
                  to={"/posts?page=1"} />
            <Link className={classnames('link', 'link_theme_navbar', 'navbar__search', props.activeLink === 'search' ? 'link_theme_active' : '')}  
                  to={"/search"} />
            <Link className={classnames('link', 'link_theme_navbar', 'navbar__addpost', props.activeLink === 'addpost' ? 'link_theme_active' : '')} 
                  to={"/addpost"} />
            <Link className={classnames('link', 'link_theme_navbar', 'navbar__profile', props.activeLink === 'profile' ? 'link_theme_active' : '')} 
                  to={"/profile"} />
        </div>
    )
}