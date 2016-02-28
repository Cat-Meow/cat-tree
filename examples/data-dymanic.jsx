import React, { Component } from 'react';
import Tree from '../src/tree.js';
import DATA from './data';

export default class Example extends Component {

    state = {
        data: [],
        selected: '/pages/price/poidetail.jsp'
    };

    onClick() {
        this.setState({
            data: DATA[Math.floor(Math.random() * DATA.length)].children
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-small" onClick={this::this.onClick}>切换数据</button>
                <Tree {...this.state} dynamic={true}/>
                <hr />
                <Tree {...this.state} dynamic={true}/>
            </div>          
        );
    }
}
