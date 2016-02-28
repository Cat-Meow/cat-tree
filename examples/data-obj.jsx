import React, { Component } from 'react';
import Tree from '../src/tree.js';
import DATA from './data';

export default class Example extends Component {
    state = {
        data: DATA[0],
        selected: '/pages/price/poidetail.jsp'
    };

    render() {
        return <Tree {...this.state}/>;
    }
}
