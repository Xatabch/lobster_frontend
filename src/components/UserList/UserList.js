import React from 'react';
import classnames from 'classnames';
import './UserList.css';
import nanoid from 'nanoid';

export default function UserList(props) {
    return (
        <ul className="user-list">
            {props.foundProfiles.map(item => {
                return (
                    <ol key={nanoid()} className="user-list__user">
                        <a className="user__link" href={`/profile?nickname=${item.login}`}>{item.login}</a>
                    </ol>
                )
            })}
        </ul>
    )
}