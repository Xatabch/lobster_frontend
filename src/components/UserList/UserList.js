import React from 'react';
import { Link } from 'react-router';
import './UserList.css';
import nanoid from 'nanoid';

export default function UserList(props) {
    return (
        <ul className="user-list">
            {props.foundProfiles.map(item => {
                return (
                    <ol key={nanoid()} className="user-list__user">
                        <Link className="user__link" to={`/profile?username=${item.login}`}>{item.login}</Link>
                    </ol>
                )
            })}
        </ul>
    )
}