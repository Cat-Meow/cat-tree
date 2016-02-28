import React, { Component } from 'react';
import Tree from '../src/tree.js';
import DATA from './data';

export default class Example extends Component {
    state = {
        data: DATA,
        selected: '/pages/price/poidetail.jsp'
    };

    getData(data) {
        console.log('当前选中的数据对列：');
        console.log(data);
    }

    render() {
        return <Tree {...this.state} onClick={this::this.getData}/>;
    }
}
