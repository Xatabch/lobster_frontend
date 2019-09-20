import React, { Component } from 'react';
import './Paginate.css';

class Paginate extends Component {

    onLeftClick() {
        this.props.onClick('left');
    }

    onRightClick() {
        this.props.onClick('right');
    }

    render() {
        return (
            <div className="paginate">
                <div className="pagiante__left" onClick={() => { this.onLeftClick() }}>
                    Left
                </div>
                <div className="paginate__page">{this.props.page}</div>
                <div className="pagiante__right" onClick={() => { this.onRightClick() }}>
                    Right
                </div>
            </div>
        )
    }
}

export default Paginate;