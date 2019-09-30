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
                { this.props.isLast ? 
                    (<div className="pagiante__left" onClick={() => { this.onLeftClick() }}>
                        Left
                    </div>)
                    : (<div className="pagiante__left"></div>)
                }
                { !this.props.isEmpty ? (<div className="paginate__page">{this.props.page}</div>) : null }
                { this.props.isNext ?
                    (<div className="pagiante__right" onClick={() => { this.onRightClick() }}>
                        Right
                    </div>)
                    : (<div className="pagiante__right"></div>)
                }
            </div>
        )
    }
}

export default Paginate;