/**
 * @title 少页数Pagination
 * @description 所有页数均显示。
 */

import React, { Component } from 'react';
import Pagination from '../../src';

class Demo6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            btnType: {},
            changeNum: 0,
        }
    }
    handleSelect(eventKey) {
        console.log(eventKey);
        this.setState({
            activePage: eventKey
        });
    }

    dataNumSelect = (index, value) => {
        console.log(index, value);

    }
    changeBtn = () => {
        let { changeNum } = this.state;
        switch (changeNum) {
            case 0:
                this.setState({
                    btnType: { "colors": "success" },
                    changeNum: 1
                });
                break;
            case 1:
                this.setState({
                    btnType: { "colors": "success", shape: "border" },
                    changeNum: 2
                });
                break;
            case 2:
                this.setState({
                    btnType: { "colors": "warning"},
                    changeNum: 3
                });
                break;
            default:
                this.setState({
                    btnType: { shape:"border" },
                    changeNum: 0
                });
        }


    }
    render() {
        return (
            <div>
                <div onClick={this.changeBtn} className="clickBtn">click按钮颜色</div>
                <Pagination
                    first
                    last
                    prev
                    next
                    maxButtons={5}
                    boundaryLinks
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                    onDataNumSelect={this.dataNumSelect}
                    showJump={true}
                    total={100}
                    dataNum={2}
                    btnType={this.state.btnType}
                />

            </div>
        );
    }
}

export default Demo6;